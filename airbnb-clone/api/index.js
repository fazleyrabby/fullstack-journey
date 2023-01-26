const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const User = require('./models/User.js')
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);

app.use(express.json())

app.use(cors({
    credentials:true,
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

    const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, salt),
    })

    res.json(userDoc)
})

app.listen(4000)

