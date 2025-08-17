const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {

        profileImage: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        no: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Prefer not to Say'],
        },
        emailVerified: {
            type: Boolean,
            required: true,
        },
        noVerified: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
