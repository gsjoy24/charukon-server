/* eslint-disable no-unused-vars */
import { Date, Model } from 'mongoose';

export interface TBanner {
  _id?: string;
  public_id?: string;
  url: string;
  isPaused: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BannerModel extends Model<TBanner> {
  isBannerExists(id: string): Promise<TBanner | null>;
}
