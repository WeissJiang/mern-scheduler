const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const TicketHourSchema = new Schema({
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        immutable: true
    },
    time: {
        type: Number,
    },
    note: {
        type: String,
        default: ""
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

const TicketCommentSchema = new Schema({
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        immutable: true
    },
    content: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

const TicketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story'
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    estimate: {
        type: Number,
        required: true,
        default: 0
    },
    comments: [TicketCommentSchema],
    hours: [TicketHourSchema],
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    workOrder: {
        type: Schema.Types.ObjectId,
        ref: 'WorkOrder'
    },
    dueDate: Date,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = {
    TicketHour: Mongoose.model('TicketHour', TicketHourSchema),
    TicketComment: Mongoose.model('TicketComment', TicketCommentSchema),
    Ticket: Mongoose.model('Ticket', TicketSchema)
};