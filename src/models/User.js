const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatarImage: {
        type: String,
        default: 'https://www.easy-profile.com/support.html?controller=attachment&task=download&tmpl=component&id=2883'
    },
}, {
    timestamps: true
})

const User = model('user', UserSchema)

module.exports = User