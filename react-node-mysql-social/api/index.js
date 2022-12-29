import express from "express"
import {db} from "./db.js";

const app = express()


app.post("/test", (request, response) => {
    const query = "SELECT * FROM posts";
    db.query(query, (err, data) => {
        if(err) return response.send(err)
        return response.status(200).json(data)
    })
})

app.listen(8800, () => {
    console.log('Connected!')
})