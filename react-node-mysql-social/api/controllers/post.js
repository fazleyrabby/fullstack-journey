import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.status(403).json("Token Invalid!")

        const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid) LEFT JOIN relationships AS r ON (p.userid = r.followedUserId) WHERE r.followerUserId = ? OR p.userid= ? ORDER BY created_at DESC`

        db.query(q, [user.id, user.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })

}