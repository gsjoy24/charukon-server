import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, needsPasswordChange } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(
    req.userData as JwtPayload,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const result = await AuthServices.forgotPassword(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link sent successfully',
    data: null,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPassword(req.body, token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
