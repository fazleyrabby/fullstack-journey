const express = require('express')
const download = require('image-downloader');
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
const multer = require('multer')
const fs = require('fs')
const {response} = require("express");
const cookieParser = require('cookie-parser')
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);
const jwtsecret = 'testtoken';
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'))
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

app.get('/profile', (req, res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, jwtsecret, {}, async(err, user) => {
            if(err) throw err;
            const { email , name, _id} = await User.findById(user.id)
            res.json({ email , name, _id})
        })
    }else{
        res.json(null)
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email})
    if(userDoc){
        const passConfirm = bcrypt.compareSync(password, userDoc.password)
        if(passConfirm){
            jwt.sign({
                email:userDoc.email,
                id: userDoc._id
                },
                jwtsecret, {}, (err, token) =>{
                if(err) throw err;
                res.cookie('token', token).json(userDoc)
            })
        }else{
            res.status(422).json('pass error!')
        }
    }else{
        res.json('not found')
    }
})

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body
    const newName = 'photo'+Date.now() + '.jpg'
    await download.image({
        url: link,
        dest: __dirname +'/uploads/'+ newName,
    })
    res.json(newName)
})
const photosMiddleware = multer({dest: 'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = []
    for (let i =0; i< req.files.length; i++){
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path +'.'+ ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath)
    }
    res.json(uploadedFiles)
})


app.post('/logout', async (req, res) => {
    res.cookie('token', '').json(true);
})
app.listen(8800)

