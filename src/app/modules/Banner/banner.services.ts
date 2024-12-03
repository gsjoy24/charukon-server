import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import deleteImage from '../../utils/deleteImage';
import { TBanner } from './banner.interfaces';
import { Banner } from './banner.model';

const createBanner = async (banner: TBanner) => {
  const newBanner = await Banner.create(banner);
  return newBanner;
};

const getBanners = async () => {
  const result = await Banner.find();
  return result;
};

const updateBanner = async (bannerId: string, banner: TBanner) => {
  const updatedBanner = await Banner.findByIdAndUpdate(bannerId, banner, {
    new: true,
    runValidators: true,
  });

  if (!updatedBanner) {
    throw new AppError(httpStatus.NOT_FOUND, 'Banner not found!');
  }

  return updatedBanner;
};

const deleteBanner = async (bannerId: string) => {
  const banner = await Banner.findById(bannerId);
  if (!banner) {
    throw new AppError(httpStatus.NOT_FOUND, 'Banner not found!');
  }

  // Delete image from cloudinary
  await deleteImage(banner?.public_id as string);

  const deletedBanner = await Banner.findByIdAndDelete(bannerId);
  return deletedBanner;
};

const toggleIsPausedBanner = async (bannerId: string) => {
  const banner = await Banner.findById(bannerId);
  if (!banner) {
    throw new AppError(httpStatus.NOT_FOUND, 'Banner not found!');
  }

  banner.isPaused = !banner.isPaused;
  const updatedBanner = await banner.save();

  return updatedBanner;
};

const BannerServices = {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
  toggleIsPausedBanner,
};

export default BannerServices;
