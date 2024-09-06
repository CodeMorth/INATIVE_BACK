import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();


const { CLOUD_NAME , API_KEY , API_SECRET} = process.env
// Configuration
 cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET 
});


export default cloudinary