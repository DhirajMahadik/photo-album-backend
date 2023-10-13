import express from 'express'
import connect from './db_connection/config.js'
import cors from 'cors'
import env from 'dotenv'
env.config({ path: './.env' });

const app = express()
app.use(express.json())
app.use(cors())

import loginHandler from './routes/login.js'
import addCollectionHandler from './routes/add-collection.js'
import getCollectionsHandler from './routes/get-collections.js'
import getCollectionImagesHandler from './routes/collection-images.js'
import addImageToCollectionHandler from './routes/add-images.js'
import getRecentImagesHandler from './routes/get-images.js';

app.use('/api/auth',loginHandler)

app.use('/api', addCollectionHandler)

app.use('/api', getCollectionsHandler)

app.use('/api', getCollectionImagesHandler)

app.use('/api', addImageToCollectionHandler)

app.use('/api', getRecentImagesHandler)

connect.connect((error)=>{
    if(error) throw error;
    app.listen(process.env.PORT,()=>{
        console.log('Server is running')
    })
})