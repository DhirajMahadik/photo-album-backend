import express from 'express'
import database from '../db_connection/config.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import JWT from 'jsonwebtoken'
import env from 'dotenv'
env.config({path:'../.env'})


const router = express.Router()

router.get('/get-images',verifyToken, (req,res)=>{
    JWT.verify(req.token, process.env.JWT_SECRET,(error,authData)=>{
        if(error) res.status(409)
        database.query('select * from images where userID = ?',[authData.id],(error, response)=>{
            if(error) res.status(500).json('could not found images')
            res.send(response.slice(0,7))
        })
    })
   
})

export default router