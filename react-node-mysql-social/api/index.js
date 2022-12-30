import express from "express"
import {db} from "./db.js";
const app = express()
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/comments", commentRoutes)
// app.post("/test", (request, response) => {
//     const query = "SELECT * FROM posts";
//     db.query(query, (err, data) => {
//         if(err) return response.send(err)
//         return response.status(200).json(data)
//     })
// })

app.listen(8800, () => {
    console.log('Connected!')
})