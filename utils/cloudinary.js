import {v2 as cloudinary} from "cloudinary";
import fs from 'fs';

//configure the cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//function to upload image to cloudinary
export async function uploadToCloudinary(filePath, folder="Doctor") {
    try{
        const result=await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: "image",
        });

        //delete the local file after uploading
        fs.unlinkSync(filePath);
        return result;
    }
    catch(err){
        console.error("Error uploading to Cloudinary:", err);
        throw err;
    }
}


//function to delete image from cloudinary
export async function deleteFromCloudinary(publicId){
    try{
        if (!publicId) return;
        await cloudinary.uploader.destroy(publicId);
    }
    catch(err){
        console.error("Error deleting from Cloudinary:", err);
        throw err;
    }
}


export default cloudinary;