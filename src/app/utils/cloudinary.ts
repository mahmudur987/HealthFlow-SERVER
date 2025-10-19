import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

async function uploadToCloudinary(file: Express.Multer.File) {
  // Configuration
  cloudinary.config({
    cloud_name: "dysvaou7n",
    api_key: "762516912211761",
    api_secret: "nJ4h_9A8vOgDTe5C8lpDK0jc9Y0", // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(file.path, {
      public_id: file.originalname,
      resource_type: "auto",
      overwrite: true,
      format: file.mimetype.split("/")[1],
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  return uploadResult;
}
export default uploadToCloudinary;
