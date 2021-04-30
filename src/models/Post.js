const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Post = model('posts', PostSchema);

module.exports = Post
