const User = require('../models/user.model')

module.exports.register = async (req, res) => {
    try {
        const { email } = req.body

        const isExist = await User.findOne({ email })

        if (isExist) {
            res.status(400).json({ created: false, description: 'Already exists', user: isExist })
        }

        const user = await new User({ email }).save()

        res.status(201).json({ created: true, description: 'OK', user })
    } catch (e) {
        res.status(400).json({ created: false, description: e.message })
    }
}

module.exports.login = async (req, res) => {
    try {

    } catch (e) {
        res.status(400).json({ created: false, description: e.message })

    }
}