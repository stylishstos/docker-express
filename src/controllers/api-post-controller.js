const Post = require('../models/post');

const handleError = (res, error) => {
    res
        .status(500)
        .send(error);
};

const getPosts = (req, res) => {
    Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts)=> res.status(200).json(posts))
        .catch(handleError);
};

const addPost = (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text });

    post
        .save()
        .then((post)=> res.status(200).json(post))
        .catch(error => handleError(res, error));
};

const getPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then((post)=> res.status(200).json(post))
        .catch(error => handleError(res, error));
};

const deletePost = (req, res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then(()=> res.status(200).json(req.params.id))
        .catch(error => handleError(res, error));
};

const postEdit = (req, res) => {
    Post
        .findByIdAndUpdate(req.params.id, req.body)
        .then((post)=> res.status(200).json(post))
        .catch(error => handleError(res, error));
};

module.exports = {
    getPosts,
    addPost,
    getPost,
    deletePost,
    postEdit
};
