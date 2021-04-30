const { sign } = require("jsonwebtoken")
const { pick } = require("lodash")
const { SECRET } = require('../config')

const issueToken = async (user) => {
    let token = sign(user, SECRET, { expiresIn: 60 * 60 * 24 })
    return `Bearer ${token}`
}
const serializeUser = (user) => pick(user, ['id', 'username', 'email', 'firstName', 'lastName'])

module.exports = { issueToken, serializeUser }
