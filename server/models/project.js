const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Mongoose.model('Project', ProjectSchema);