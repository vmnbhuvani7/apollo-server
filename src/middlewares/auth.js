const { UserInputError } = require("apollo-server-errors");
const { verify } = require("jsonwebtoken");
const { SECRET } = require('../config');
const { User } = require('../models');

const AuthMiddleware = async (req, res, next) => {
    const authHeaders = req.get("Authorization");
    if (!authHeaders) {
        // req.isAuth = false;
        return next();
    }
    let token = authHeaders.split(' ')[1];
    if (!token || token === '') {
        // req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = verify(token, SECRET)
    } catch (err) {
        // req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        // req.isAuth = false;
        return next();
    }

    let authUser = await User.findById(decodedToken.id)

    if (!authUser) {
        // req.isAuth = false;
        return next();
    }
    // req.isAuth = true;
    req.user = authUser;
    return next()

}

module.exports = { AuthMiddleware }