// import express from "express"
import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'


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

app.use(express.json())
app.use(cors())

//Test
app.get("/", (req, res) => {
    res.json("Hello this is the backend!")
})

//Index page all books
app.get("/books", (req, res) => {
    db.connect((error) => {
        const q = "SELECT * from books"
        db.query(q, (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
        })
    })
})

//Get single book page
app.get("/books/:id", (req, res) => {
    const bookID = req.params.id
    db.connect((error) => {
        const q = `SELECT * from books where id=${bookID} limit 1`
        db.query(q, (err, data) => {
            if (err) return res.json(err)
            return data[0] ? res.json(data[0]) : []
        })
    })
})

//Create new book
app.post("/books", (req, res) => {
    db.connect((error) => {
        const q = "INSERT INTO books(`title`,`desc`,`cover`,`price`) VALUES (?)"
        const values = [
            req.body.title, 
            req.body.desc, 
            req.body.cover,
            req.body.price,
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err)
            return res.json("Book created successfully!!")
        })
    })
})
//Update books
app.put("/books/:id", (req, res) => {
    const bookID = req.params.id
    db.connect((error) => {
        const q = "UPDATE books set `title` = ?,`desc` = ?,`cover` = ?,`price` = ? WHERE id = ?"
        const values = [
            req.body.title, 
            req.body.desc, 
            req.body.cover,
            req.body.price,
        ]
        db.query(q, [...values, bookID], (err, data) => {
            if (err) return res.json(err)
            return res.json("Book Updated successfully!!")
        })
    })
})

//Delete Book by id
app.delete("/books/:id", (req, res) => {
    const bookID = req.params.id
    db.connect((error) => {
        const q = "DELETE FROM books where id = ?"
        db.query(q, [bookID], (err, data) => {
            if (err) return res.json(err)
            return res.json("Book deleted successfully!!")
        })
    }) 
})

app.listen(8880, () => {
    console.log("Connected to backend! from express!");
})


