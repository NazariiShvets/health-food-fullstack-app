const { Schema, model } = require('mongoose')

const DeprecatedToken = new Schema({
    token: { type: String, required: true }
})

module.exports = model('DeprecatedToken', DeprecatedToken)