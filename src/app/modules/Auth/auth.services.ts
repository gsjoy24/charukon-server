import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { AccountStatus } from '../../constants';
import PasswordChangeNotificationTemplate from '../../EmailTemplates/PasswordChangeNotificationTemplate';
import ResetPasswordTemplate from '../../EmailTemplates/ResetPasswordTemplate';
import AppError from '../../errors/AppError';
import { User } from '../User/User.model';
import { sendEmail } from './../../utils/sendEmail';
import { TChangePassword, TLogin, TResetPassword } from './auth.types';
import { createToken, verifyToken } from './auth.utils';

const confirmEmail = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized!');
  }

  const decoded = verifyToken(token, config.email_confirmation_secret);

  const user = await User.isUserExists(decoded?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are blocked! Contact Support!',
    );
  }

  // check if the user is already confirmed
  if (user.isEmailConfirmed) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Your email is already confirmed!',
    );
  }

  const result = await User.findOneAndUpdate(
    {
      _id: decoded.id,
      email: decoded.email,
    },
    {
      isEmailConfirmed: true,
    },
    {
      new: true,
    },
  );
  return result;
};

const loginUser = async (payload: TLogin) => {
  const { email, password } = payload;

  // check if the user is exist
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found!');
  }

  // check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are blocked by the authority! Please contact them to know the issue!',
    );
  }

  // check if the user is deleted
  if (user.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are unauthorized to login! Please contact to the authority.',
    );
  }

  // check if the user is confirmed the email
  if (!user.isEmailConfirmed) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Your email is not confirmed! Please confirm your email first to login!',
    );
  }

  // check if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials!');
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expiration,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expiration,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const { oldPassword, newPassword } = payload;

  // check if the user is exist
  const user = await User.findOne({
    _id: userData.id,
    email: userData.email,
  }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found!');
  }

  // check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are blocked by the authority! Please contact them to know the issue!',
    );
  }

  // check if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    oldPassword,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match!');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findByIdAndUpdate(userData.id, {
    password: hashedPassword,
  });
  const template = PasswordChangeNotificationTemplate(
    user?.full_name || user?.name?.firstName,
    user?.email,
    config.support_email,
  );

  await sendEmail(user?.email, 'Password Changed', template);

  return result;
};

const getMe = async (userData: JwtPayload) => {
  const { id, email } = userData;

  const result = await User.findOne({ _id: id, email }).populate(
    'cart.product',
  );
  // if user not found
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized!');
  }
  // check if the token is valid
  const decoded = jwt.verify(token, config.jwt_refresh_secret) as JwtPayload;

  // check if the user is exist
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found!');
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiration as string,
  );

  return accessToken;
};

const forgotPassword = async (email: string) => {
  // check if the user is exist and have active status
  const user = await User.findOne({ email, status: AccountStatus.active });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
  };

  const resetToken = createToken(
    jwtPayload,
    config.password_reset_secret,
    config.password_reset_expiration,
  );

  const resetUILink = `${config.client_url}/reset-pass?token=${resetToken}`;

  const template = ResetPasswordTemplate(
    user?.full_name || user?.name?.firstName,
    user?.email,
    resetUILink,
  );

  await sendEmail(user?.email, 'Reset Your Password', template);
  return;
};

const resetPassword = async (payload: TResetPassword) => {
  const { token, newPassword } = payload;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized!');
  }

  const decoded = jwt.verify(token, config.password_reset_secret) as JwtPayload;

  const user = await User.isUserExists(decoded?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are blocked! Contact Support!',
    );
  }

  if (decoded.id !== user?._id?.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findOneAndUpdate(
    {
      _id: decoded.id,
    },
    {
      password: hashedPassword,
    },
  );
  return result;
};

export const AuthServices = {
  confirmEmail,
  loginUser,
  changePassword,
  forgotPassword,
  getMe,
  refreshToken,
  resetPassword,
};
