import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv'
dotenv.config();


const storage = new GridFsStorage({
   url:`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongofirst.yl7tlln.mongodb.net/WhatsApp?retryWrites=true&w=majority`
   ,file:(req,file)=>{
    const match = ["image/png",'image/jpg'];
    console.log("YETHE1");

    if(match.indexOf(file.mimeType)===-1){
        console.log("All1o",file,`${Date.now()}-file-${file.originalname}`);

        return `${Date.now()}-file-${file.originalname}`;
    }
    console.log("YETHE");
    return {
        bucketName:'photos',
        filename: `${Date.now()}-file-${file.originalname}`,
    }
   } 
});
const upload = multer({storage});
export default upload;



// export const upload = async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }