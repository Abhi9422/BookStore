import  {v2 as cloudinary} from "cloudinary";


const connectCloudinary = async () => {
    await cloudinary.config({
     cloud_name : process.env.COUDINARY_NAME,
     api_key : process.env.COUDINARY_API_KEY,
     api_secret : process.env.COUDINARY_SECRET_KEY
   })
   
   

}


export default connectCloudinary