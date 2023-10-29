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
    // Tables = users , collections, images
    // columns in tables = {
    //     users = user_id, email, password
    //     collections = userId, collection_id, collection_name
    //     images = image_id, image_url, collectionId, userID
    // }

export default connect;