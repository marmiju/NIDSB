import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config() //config dotenv

// Database connection function
const db = () => {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DB,
        port: process.env.PORT
    });
    connection.connect(err => {
        if (err) {
            console.error('Database connection failed:', err);
            return;
        }
        console.log('Connected to the database.');
    });
    return connection;
};

export default db;
