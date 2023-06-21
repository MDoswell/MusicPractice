const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

// const db = connectDB();

const app = express();

// Create DB
// TODO: remove this once done
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE nodemysql';
//     db.query(sql, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log(result);
//         res.send('database created');
//     })
// })

// Create table
// app.get('/createpoststable', (req, res) => {
//     let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id));';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Posts table created');
//     })
// })

// Insert post 1
// app.get('/addpost1', (req, res) => {
//     let post = {
//         title: 'post1',
//         body: 'this is post 1'
//     }
//     let sql = 'INSERT INTO posts SET ?';
//     let query = db.query(sql, post, (err, result) => {
//         if (err) throw err;
//         res.send('Post 1 added');
//     })
// })

// Get posts
// app.get('/getposts', (req, res) => {
//     let sql = 'SELECT * FROM posts;';
//     let query = db.query(sql, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         res.send('Posts fetched');
//     })
// })

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

