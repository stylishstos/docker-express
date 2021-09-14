const Post = require('../models/post');

const getPosts = (req, res) => {
    Post.find().sort({ createdAt: -1 }).then((posts) => {
        res.render('posts', { posts });
    }).catch((error) => {
        res.render('error', { error });
    });
};

const getAddPost = (req, res) => {
    res.render('add-post');
};

const addPost = (req, res) => {
    const { title, author, text } = req.body;

    const post = new Post({ title, author, text });

    post.save()
    .then((result) => {
        res.redirect('/posts');
    })
    .catch((error) => {
        res.render('error', { error });
    });
};

const getPost = (req, res) => {
    Post.findById(req.params.id)
    .then((post) => {    
        res.render('post', { post });
    }).catch((error) => {
        res.render('error', { error });
    });
};

const deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then((post) => {    
        res.sendStatus(200);
    }).catch((error) => {
        res.render('error', { error });
    });
};

const getPostEdit = (req, res) => {
    Post.findById(req.params.id)
    .then((post) => {    
        res.render('edit-post', { post });
    }).catch((error) => {
        res.render('error', { error });
    });
};

const postEdit = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
    .then((post) => {    
        res.redirect(`/posts/${req.params.id}`);
    }).catch((error) => {
        res.render('error', { error });
    });
};

module.exports = {
    getPosts,
    getAddPost,
    addPost,
    getPost,
    deletePost,
    getPostEdit,
    postEdit
};
