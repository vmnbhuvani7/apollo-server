const { gql } = require('apollo-server-express')

module.exports = gql`
    extend type Query{
        info: String!
    }
    extend type Mutation {
        imageUploader(file: Upload!): String!
    }
`;