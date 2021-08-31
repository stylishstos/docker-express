const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const Post = require('./src/models/post');

const DB = 'mongodb+srv://admin:Mongodb314314@cluster0.p3lgr.mongodb.net/sample_express?retryWrites=true&w=majority';
const PORT = process.env.PORT ?? 3000;
const TODAY = new Date().toUTCString();

const server = express();
mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res)=> console.log('db connectd'))
    .catch((error) => console.error(error));

server.use('/css', express.static(path.resolve(__dirname, 'src/views/css')));
server.use('/img', express.static(path.resolve(__dirname, 'src/views/img')));

server.use(logger(':method :url :status :res[content-length] - :response-time ms'));
server.use(express.urlencoded({ extended: false }));

server.set("view engine", "ejs");
server.set("views", path.resolve(__dirname, 'src/views'));

server.get('/', (req, res) => {
    res.render('index', { name: req.query.name });
});

server.get('/posts', (req, res) => {
    Post.find({}).then((result) => {
        const posts = result.map(post => ({
            id: post._id,
            date: new Date(post.createdAt).toLocaleDateString(),
            title: post.title,
            author: post.author,
            text: post.text
        }));

        res.render('posts', { posts });
    }).catch((error) => {
        res.render('error', { error });
    });
});

server.get('/posts/add', (req, res) => {
    res.render('add-post');
});

server.post('/posts/add', (req, res) => {
    const { title, author, text } = req.body;

    const post = new Post({ title, author, text });

    post.save()
    .then((result) => {
        const { createdAt, _id, title, author, text } = result;

        res.render('post', {
            post: {
                id: _id,
                date: new Date(createdAt).toLocaleDateString(),
                title,
                author,
                text
            }
        });
    })
    .catch((error) => {
        res.render('error', { error });
    });
});

server.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id)
    .then((result) => {
        const post = {
            id: result._id,
            text: result.text,
            title: result.title,
            date: new Date(result.createdAt).toLocaleDateString(),
            author: result.author
        };
    
        res.render('post', { post });
    }).catch((error) => {
        res.render('error', { error });
    });
});

server.listen(PORT, () => { console.log(`server has strted on port ${PORT}`); });