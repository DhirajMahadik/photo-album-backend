import express from 'express'
import database from '../db_connection/config.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import JWT from 'jsonwebtoken'
import env from 'dotenv'
env.config({path:'../.env'})


const router = express.Router()

router.post('/add-collection',verifyToken, (req,res)=>{
    console.log(req.token)
    const collection = req.body.collection_name
    JWT.verify(req.token, process.env.JWT_SECRET,(error,authData)=>{
        console.log(authData)
        if(error) res.status(409)
        database.query('insert into collections (collection_name,userId) values(?,?)',[collection,authData.id],(error, response)=>{
            if(error) res.status(500).json('Collection not added')
            console.log(response)
            res.status(200).json('Collection added')
        })
    })
   
})

export default router