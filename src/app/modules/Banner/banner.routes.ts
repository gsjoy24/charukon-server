import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import BannerControllers from './banner.controllers';
import BannerValidations from './banner.validations';

const router = express.Router();

router.post(
  '/create',
  validateRequest(BannerValidations.createBannerValidation),
  BannerControllers.createBanner,
);

router.get('/', BannerControllers.getBanners);

router.put(
  '/:id',
  validateRequest(BannerValidations.updateBannerValidation),
  BannerControllers.updateBanner,
);

router.patch('/:id', BannerControllers.toggleIsPausedBanner);

router.delete('/:id', BannerControllers.deleteBanner);

const BannerRoutes = router;

export default BannerRoutes;
