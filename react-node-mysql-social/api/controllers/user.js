import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?"
    db.query(q, [userId], (err, data) => {
        if (err) res.status(500).json(err)
        const { password, ...info } = data[0]
        return res.json(info)
    })
}