import mysql from 'mysql2'
import env from 'dotenv'
env.config()

const connect = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    user:process.env.DATABASE_USER,
    database:process.env.DATABASE,
    password:process.env.DATABASE_PASSWORD

})

// database details for your reference 
    // Tables = photo_album_users , photo_album_collections, photo_album_images
    // columns in tables = {
    //     photo_album_users = user_id, email, password
    //     photo_album_collections = userId, collection_id, collection_name
    //     photo_album_images = image_id, image_url, collectionId, userID
    // }

export default connect;