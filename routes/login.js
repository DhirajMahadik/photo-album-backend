import express from 'express'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import database from '../db_connection/config.js'
import env from 'dotenv'
env.config()

const route = express.Router()

route.post('/login', (req, res) => {
    try {
        const email = req.body.email;
        let query = 'Select password, user_id from users where email = ?'
        database.query(query, [email], async (error, response) => {
            if (error) res.status(500).send( 'some error occurs' );
            if (response.length !== 0) {
                let pass = await bcrypt.compare(req.body.password, response[0].password);
                if (pass) {
                    let id = response[0].user_id
                    JWT.sign({ id }, process.env.JWT_SECRET, (error, token) => {
                        if (error) res.status(500).send('some error occurs');
                        res.send({ token })
                    })
                } else {
                    res.status(404).send('Invalid user credential')
                }
            } else {
                res.status(404).send('User not found')
            }

        })
    } catch (error) {
        res.status(500).send(error)
        
    }
})

route.post('/register', (req, res) => {
    try {
        const email = req.body.email;
        bcrypt.hash(req.body.password, 2, (err, hash) => {
            if (err) res.status(500).send('some error occurs' );
            database.query('insert into users(email,password) values(?,?)', [email, hash], (error, response) => {
                if (error) res.status(400).send(error.message.slice(0, error.message.length - 23) )
                res.send(response)
            })
        })

    } catch (error) {
        res.send(error)
    }
})

export default route
