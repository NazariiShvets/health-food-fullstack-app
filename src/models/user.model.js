const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    email: {
        type: String,
        required: true,
    },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // age: {
    //     type: Number,
    //     required: true
    // },
    // sex: {
    //     type: String,
    //     required: true,
    //     enum: ['Male', 'Female', 'Other'],
    // },
    // growth: {
    //     type: Number,
    //     required: true
    // },
    // weight: {
    //     type: Number,
    //     required: true
    // },

}, {
    timestamps: true
})


module.exports = mongoose.model('user', User)