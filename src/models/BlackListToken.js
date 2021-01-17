const { Schema, model } = require('mongoose')

const BlackListToken = new Schema({
    token: { type: String, unique: true, required: true },
})

module.exports = model('BlackListToken', BlackListToken)