const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const StorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color:{
        type: String,
        default: "#1c83a5"
    },
    order: {
        type: Number,
        required: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Mongoose.model('Story', StorySchema);