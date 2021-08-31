const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = model('Post', postSchema);