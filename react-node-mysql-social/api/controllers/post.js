import { db } from "../db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
    const userId  = req.query.userId
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.status(403).json("Token Invalid!")

        const q = userId ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid) WHERE p.userid = ?` : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid) LEFT JOIN relationships AS r ON (p.userid = r.followedUserId) WHERE r.followerUserId = ? OR p.userid= ? ORDER BY created_at DESC`

        const values = userId ? [userId] : [
            user.id, 
            user.id
        ]
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })

}

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.status(403).json("Token Invalid!")

        const q = 'INSERT INTO posts (`desc`,`img`,`created_at`,`userid`) VALUES (?)'

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            user.id,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Post created!")
        })
    })
}