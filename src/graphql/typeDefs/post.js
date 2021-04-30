const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        getAllPost: [Post!]!
        getPostById(id: ID!): [Post!]!
    }

    extend type Mutation {
        createNewPost(newPost: PostInput!): Post!
        editPostByID(updatedPost: PostInput, id: ID!): Post!
        deletePost(id: ID!): PostNotification!
    }
    
    input PostInput {
        title: String!
        content: String!
        featuredImage: String
    }
    
    type PostNotification {
        id: ID!
        message: String
        success: Boolean
    }

    type Post {
        id:ID!
        title: String!
        content: String!
        updatedAt: String
        createdAt: String
        featuredImage: String
    }
    
    extend type Subscription {
        userChange : UserSubscribe
    }

    type UserSubscribe {
        keyType : String
        data: Post
    }
`;