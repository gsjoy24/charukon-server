import { z } from 'zod';

const createBannerValidation = z.object({
  body: z.object({
    url: z
      .string({
        required_error: 'Banner URL is required!',
      })
      .min(5, {
        message: 'Banner URL must be at least 5 characters long!',
      }),
    public_id: z.string({
      required_error: 'Public ID is required!',
    }),
    isPaused: z.boolean().optional().default(false),
  }),
});

const updateBannerValidation = z.object({
  body: z.object({
    url: z
      .string()
      .min(5, {
        message: 'Banner URL must be at least 5 characters long!',
      })
      .optional(),
    isPaused: z.boolean().optional(),
  }),
});

const BannerValidations = {
  createBannerValidation,
  updateBannerValidation,
};

export default BannerValidations;
