import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BannerServices from './banner.services';

const createBanner: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BannerServices.createBanner(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Banner created successfully!',
      data: result,
    });
  },
);

const getBanners: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const banners = await BannerServices.getBanners();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Banners retrieved successfully',
      data: banners,
    });
  },
);

const updateBanner: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bannerId = req.params.id;
    const result = await BannerServices.updateBanner(bannerId, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Banner updated successfully!',
      data: result,
    });
  },
);

const deleteBanner: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bannerId = req.params.id;
    const result = await BannerServices.deleteBanner(bannerId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Banner deleted successfully!',
      data: result,
    });
  },
);

const toggleIsPausedBanner: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bannerId = req.params.id;
    const result = await BannerServices.toggleIsPausedBanner(bannerId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Banner ${
        result.isPaused ? 'paused' : 'unpaused'
      } successfully!`,
      data: result,
    });
  },
);

const BannerControllers = {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
  toggleIsPausedBanner,
};

export default BannerControllers;
