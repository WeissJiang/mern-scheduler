const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const WorkOrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        // Set default to today at 00:00:00
        default: () => {
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        }
    },
    endDate: {
        type: Date,
        // Set default to today at 23:59:59
        default: () => {
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        }
    },
    workingDays: {
        type: String,
        default: "1111100"
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true, // only check the value is null or not, can not check the project exists or not
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Mongoose.model('WorkOrder', WorkOrderSchema);