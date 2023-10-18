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

export default connect;