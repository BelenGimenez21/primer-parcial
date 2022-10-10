const { model, Schema} = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model('task', taskSchema);