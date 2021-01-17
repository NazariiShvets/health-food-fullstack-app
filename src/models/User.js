const { Schema, model } = require('mongoose')

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sex: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    registeredAt: { type: Date, default: Date.now },
})

module.exports = model('user', User)