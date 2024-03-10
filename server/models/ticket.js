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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

const TicketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
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
    comments: [TicketHourSchema],
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    workOrder: {
        type: Schema.Types.ObjectId,
        ref: 'WorkOrder'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = {
    TicketHour: Mongoose.model('TicketHour', TicketHourSchema),
    Ticket: Mongoose.model('Ticket', TicketSchema)
};