import express from 'express'
import database from '../db_connection/config.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import JWT from 'jsonwebtoken'
import env from 'dotenv'
env.config()


const router = express.Router()

router.post('/add-collection',verifyToken, (req,res)=>{
    const collection = req.body.collection_name
    JWT.verify(req.token, process.env.JWT_SECRET,(error,authData)=>{
        if(error) res.status(409)
        database.query('insert into photo_album_collections (collection_name,userId) values(?,?)',[collection,authData.id],(error, response)=>{
            if(error) res.status(500).send('Collection not added')
            res.send('Collection added')
        })
    })
   
})

export default router