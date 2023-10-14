import express from 'express'
import database from '../db_connection/config.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import multer from 'multer'
import path from 'path'
import JWT from 'jsonwebtoken'
import Cloudinary from 'cloudinary'
import env from 'dotenv'
env.config({path:'../.env'})


const router = express.Router()

const cloudinary = Cloudinary.v2

cloudinary.config({
    cloud_name: "djmp17jsh",
    api_key: "144788257939745",
    api_secret: "pU3s1YTh-zNkit2umw9S2YABNfk"
  });

  const multerUploads = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, true)
    }

}).single('image');



router.post('/add-image/:id',verifyToken,multerUploads, (req,res)=>{

    const collection_id = req.params.id
    JWT.verify(req.token, process.env.JWT_SECRET,(error,authData)=>{
        if(error) res.status(409)
        cloudinary.uploader.upload(req.file.path,(error,result)=>{
            if(error) res.status(500);
            database.query('insert into images (image_url,collectionId,userID) values(?,?,?)',[result.url,collection_id,authData.id],(error, response)=>{
            if(error) res.status(500).json('Image  not added')
            res.send('Image added ')
        })
        })
        
    })
   
})

export default router