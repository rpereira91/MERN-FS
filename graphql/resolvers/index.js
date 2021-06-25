const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comments');

module.exports = {
    // any time a post gets resolved we pass it through here
    Post: {
        // two ways to do the same thing, one is a pure function, the other an arrow function
        likeCount(parent) {
            return parent.likes.length
        }, 
        commentCount: (parent) => parent.comments.length, 
    },
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation, 
        ...commentResolvers.Mutation,
    }, 
    Subscription: {
        ...postResolvers.Subscription,
    }
}