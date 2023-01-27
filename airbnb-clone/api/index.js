const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);
const jwtsecret = 'testtoken';
app.use(express.json())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json('testing!')
})

//mongo pass : bywPpw3ZFnGN6egl

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt),
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email})
    if(userDoc){
        const passConfirm = bcrypt.compareSync(password, userDoc.password)
        if(passConfirm){
            jwt.sign({email:userDoc.email, id: userDoc._id}, jwtsecret, {}, (err, token) =>{
                if(err) throw err;
                res.cookie('token', token).json('pass ok!')
            })
        }else{
            res.status(422).json('pass error!')
        }
    }else{
        res.json('not found')
    }
})

app.listen(4000)

