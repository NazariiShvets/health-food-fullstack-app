const authRouter = require('express').Router()
const controller = require('../controllers/auth.controller')


authRouter.post('/register', controller.register)

authRouter.post('/login', controller.login)

module.exports = authRouter