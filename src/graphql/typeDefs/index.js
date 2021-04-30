const baseDefs = require('./baseDefs');
const { gql } = require('apollo-server-express');
const post = require('./post');
const user = require('./user');
const image = require('./image');

module.exports = [
    baseDefs,
    user,
    post,
    image
]