const express = require('express');

const {
    getPosts,
    getAddPost,
    addPost,
    getPost,
    deletePost,
    getPostEdit,
    postEdit,
} = require('../controllers/post-controller');

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/add', getAddPost);
router.post('/posts/add', addPost);
router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.get('/edit/:id', getPostEdit);
router.put('/edit/:id', postEdit);

module.exports = router;