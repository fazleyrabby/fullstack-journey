// import express from "express"
import express from 'express'
import mysql from 'mysql2'

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    port: 3306,
    socketPath: "/tmp/mysql.sock",
    // insecureAuth : true
})

app.get("/", (req, res)=> {
    res.json("Hello this is the backend!")
})

app.get("/books", (req, res) => {
    db.connect((error) => {
        // if(error) throw error;
        // console.log("connected!")
        const q = "SELECT * from books"
        db.query(q, (err, data) => {
            if(err) return res.json(err)
            return res.json(data)
        })
    })
})

app.listen(8880, () => {
    console.log("Connected to backend! from express!");
})


