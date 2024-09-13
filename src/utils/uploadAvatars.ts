import { MulterFile } from '../interface/variety/upload_interface';
import { CloudinaryResponsesType } from '../interface/variety/cloudinaryResponseInterface';
import cloudinary from './cloudynari';

export const uploadAvatars = async (files: any ): Promise<CloudinaryResponsesType> => {
  try {
    const cloudinaryResponses: CloudinaryResponsesType = {};

    if (files) {
      for (const [fieldname, fileArray] of Object.entries(files)) {
        for (const file of fileArray as MulterFile[]) {
          const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
          cloudinaryResponses[fieldname] = cloudinaryResponse.secure_url;
        }
      }
    }

    return cloudinaryResponses;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
