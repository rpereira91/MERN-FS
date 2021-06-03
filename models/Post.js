const {model, Schema} = require('mongoose');

const postSchema = new Schema({
    body: String, 
    username: String, 
    createdAt: String, 
    comments: [
        {
            body: String, 
            username: String, 
            createdAt: String, 
        }
    ], 
    likes: [
        {
            username: String, 
            createdAt: String, 
        }
    ], 
    // use mongoose to automatically populate user field
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'users'
    }
})

module.exports = model('Post', postSchema)