import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const addPost = (request, response) => {
    const token = request.cookies.access_token
    if(!token) response.status(401).json("Not Authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) response.status(403).json("Token is not valid!")

        const query = "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)"

        const values = [
            request.body.title,
            request.body.desc,
            request.body.img,
            request.body.cat,
            request.body.date,
            userInfo.id,
        ]

        db.query(query, [values], (err, data) => {
            if(err) return response.status(500).json(err)
            return response.json("Post created successfully!")
        })        
    })
}

export const getPosts = (request, response) => {
    const query = request.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";

    db.query(query, [request.query.cat], (err, data) => {
        if(err) return response.send(err)
        return response.status(200).json(data)
    })
}

export const getPost = (request, response) => {
    const query = "SELECT p.id,`username`,`title`,`desc`, p.img, u.image AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id=?";

    db.query(query, [request.params.id], (err, data) => {
        if(err) return response.status(500).json(err)
        return response.status(200).json(data[0])
    })
}

export const deletePost = (request, response) => {
    const token = request.cookies.access_token
    if(!token) response.status(401).json("Not Authenticated!")
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) response.status(403).json("Token is not valid!")
        const postId = request.params.id
        const query = "DELETE FROM posts where `id` = ? AND `uid` = ?"

        db.query(query, [postId,userInfo.id], (err, data) => {
            if(err) return response.status(403).json("You can delete only your post!")

            return response.json("Post deleted successfully!")
        })        
    })
}

export const updatePost = (request, response) => {
    const token = request.cookies.access_token
    if(!token) response.status(401).json("Not Authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) response.status(403).json("Token is not valid!")
        const postId = request.params.id
        const query = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id`=? AND `uid`=?"

        const values = [
            request.body.title,
            request.body.desc,
            request.body.img,
            request.body.cat
        ]

        db.query(query, [...values, postId, userInfo.id], (err, data) => {
            if(err) return response.status(500).json(err)
            return response.json("Post updated successfully!")
        })        
    })
}