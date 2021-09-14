const express = require('express');

const {
    getPosts,
    addPost,
    getPost,
    deletePost,
    postEdit,
} = require('../controllers/api-post-controller');

const router = express.Router();

router.get('/api/posts', getPosts);
router.post('/api/posts/add', addPost);
router.get('/api/posts/:id', getPost);
router.delete('/api/posts/:id', deletePost);
router.put('/api/edit/:id', postEdit);


module.exports = router;