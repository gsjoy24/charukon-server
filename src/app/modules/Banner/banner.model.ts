import { Schema, model } from 'mongoose';
import { BannerModel, TBanner } from './banner.interfaces';

const bannerSchema = new Schema<TBanner, BannerModel>(
  {
    url: {
      type: String,
      required: [true, 'Banner URL is required!'],
      trim: true,
    },
    public_id: {
      type: String,
    },
    isPaused: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

bannerSchema.statics.isBannerExists = async function (id: string) {
  return await this.findById(id).exec();
};

export const Banner = model<TBanner, BannerModel>('Banner', bannerSchema);
