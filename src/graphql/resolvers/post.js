const EVENTS = require('../subscriptions')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

module.exports = {
    Query: {
        getAllPost: async (_, __, { Post }) => {
            let result = await Post.find({})
            return result
        },
        getPostById: async (_, { id }, { Post }) => {
            let result = await Post.findById(id)
            return [result]
        }
    },
    Mutation: {
        createNewPost: async (_, { newPost }, { Post }) => {
            let result = await Post.create(newPost)
            pubsub.publish(EVENTS.USER.USER_CREATED, {
                userChange: { keyType: 'INSERT', data: result }
            })
            return result
        },
        editPostByID: async (_, { id, updatedPost }, { Post }) => {
            let result = await Post.findByIdAndUpdate(id, { ...updatedPost }, { new: true })
            pubsub.publish(EVENTS.USER.USER_UPDATED, {
                userChange: { keyType: 'UPDATE', data: result }
            })
            return result
        },
        deletePost: async (_, { id }, { Post }) => {
            let deletePost = await Post.findByIdAndDelete(id)
            pubsub.publish(EVENTS.USER.USER_DELETED, {
                userChange: { keyType: 'DELETE', data: deletePost }
            })
            return {
                success: true,
                id: deletePost.id,
                message: 'Your post is deleted!.'
            }
        }
    },
    Subscription: {
        userChange: {
            subscribe: () => pubsub.asyncIterator([EVENTS.USER.USER_CREATED, EVENTS.USER.USER_UPDATED, EVENTS.USER.USER_DELETED]),
        },
    },
}
