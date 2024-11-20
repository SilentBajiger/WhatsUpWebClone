import grid from 'gridfs-stream'
import mongoose from 'mongoose';

const url = "http://localhost:8000";

let gfs,gridFsBucket;
const conn = mongoose.connection;
conn.once('open',()=>{
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gfs = grid(conn.db,mongoose.mongo);
    gfs.collection('fs');
});


export const uploadFile = async(req,res)=>{
    try {
        // console.log(req.file,"a");

        if(!req.file){
            return res.status(404).json("File not Found");
        }
        // console.log(req.file);
        const imageUrl = `${url}/file/${req.file.filename}`;
        console.log(imageUrl);
        // const imageUrl = `${url}/file/${req.file.originalname}`;
        return res.status(200).json(imageUrl);
    } catch (error) {
        console.log("error in Uploading File",error.message);
    }
}

export const getImage = async(req,res)=>{
    try {
        const file = await gfs.files.findOne({filename:req.params.filename});
        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    
    } catch (error) {
        return res.status(500).json(error.message);
    }
}