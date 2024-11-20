import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const ConnectDB = async()=>{
    const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongofirst.yl7tlln.mongodb.net/WhatsApp?retryWrites=true&w=majority`
    try{
       await  mongoose.connect(URL);
       console.log("DataBase Connected");
    }catch(e){
        console.log("NetWork Error",e.message);
    }
}


export default ConnectDB;

