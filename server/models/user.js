const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const { ROLE } = require('../constants');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: ROLE.STANDARD,
        enum: [ROLE.ADMIN, ROLE.MANAGER, ROLE.STANDARD]
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Mongoose.model('User', UserSchema);