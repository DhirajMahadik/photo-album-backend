import mysql from 'mysql2'
import env from 'dotenv'
env.config({path:'../.env'})

const connect = mysql.createConnection({
    host:"localhost",
    port: 3306,
    database:"photo_album",
    user:"root",
    password:"Developer@0000"
})

export default connect;