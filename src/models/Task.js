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
    status: {
        type: String,
        default: 'Pendiente',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model('task', taskSchema);