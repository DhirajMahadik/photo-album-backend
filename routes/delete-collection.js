import express from 'express'
import database from '../db_connection/config.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import JWT from 'jsonwebtoken'
import env from 'dotenv'
env.config()


const router = express.Router()

router.get('/delete-collection/:id',verifyToken, (req,res)=>{
    const collection_id = req.params.id
    JWT.verify(req.token, process.env.JWT_SECRET,(error,authData)=>{
        if(error) res.status(409)
        database.query('delete from photo_album_images where collectionId = ?',[collection_id],(error, response)=>{
            if(error) res.status(500).send('Collection not deleted')
            database.query('delete from photo_album_collections where collection_id = ?',[collection_id],(error, response)=>{
                if(error) res.status(500).send('Collection not deleted')
                res.send('Collection Deleted')
            })
            
        })
    })
   
})

export default router