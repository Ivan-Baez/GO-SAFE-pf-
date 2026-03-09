import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();

export const CloudinaryConfig = {
  provide: 'Cloudinary',
  useFactory: () => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    return cloudinary;
  },
};
