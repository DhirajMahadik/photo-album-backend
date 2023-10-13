import mysql from 'mysql2'

const connect = mysql.createConnection({
    host:'localhost',
    port: 3306,
    database:'photo_album',
    user:'root',
    password:'Developer@0000'
})

export default connect;