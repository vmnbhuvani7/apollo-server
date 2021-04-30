const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
    #    authUserProfile: User! @isAuth
       authUserProfile:String
       authenticateUser(username: String!, password: String!): AuthResp!
    }

    extend type Mutation {
        registerUser(newUser: UserInput!): AuthResp!
    }

    input UserInput {
        avatarImage: String
        firstName: String!
        lastName: String!
        username: String!
        password: String!
        email: String!
    }
    type User {
        id:ID!
        avatarImage: String
        firstName: String!
        lastName: String!
        username: String!
        email: String!
    }
    type AuthResp {
        user: User!,
        token: String!
    }
`;