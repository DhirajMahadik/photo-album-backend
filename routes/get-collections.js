import express from 'express'
import database from '../db_connection/config.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import JWT from 'jsonwebtoken'
import env from 'dotenv'
env.config({path:'../.env'})


const router = express.Router()

router.post('/get-collection',verifyToken, (req,res)=>{
    JWT.verify(req.token, process.env.JWT_SECRET,(error,authData)=>{
        if(error) res.status(409)
        database.query('select * from collections where userID = ?',[authData.id],(error, response)=>{
            if(error) res.status(500).json('could not found collections')
            res.send(response)
        })
    })
   
})

export default router