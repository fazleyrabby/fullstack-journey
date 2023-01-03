import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
    const q = `SELECT userId FROM likes WHERE postid = ?`

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data.map(like => like.userId))
    })
}

export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.status(403).json("Token Invalid!")

        const q = 'INSERT INTO likes (`userid`,`postid`) VALUES (?)'

        const values = [
            user.id,
            req.body.postId,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Post liked!!")
        })
    })
}

export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.status(403).json("Token Invalid!")

        const q = 'DELETE FROM likes WHERE `userId`= ? AND `postId`= ?'

        db.query(q, [user.id, req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Post disliked!!")
        })
    })
}