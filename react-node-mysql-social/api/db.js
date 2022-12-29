import mysql from "mysql2"

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: "social",
    socketPath: "/tmp/mysql.sock",
})