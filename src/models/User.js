const { model, Schema} = require('mongoose');

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},{
    versionKey: false,
    timestamps: true
});

// userSchema.methods.toJSON = () => {
//     const { password, _id, ...user } = userSchema.methods.toObject();
//     user.uid = _id;

//     return user;
// }

module.exports = model('user', userSchema);