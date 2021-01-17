const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { JWTSecretKey, cookiesSecretKey } = require("../config");

class userController{
    static registration = async (req, res) => {
        try{
            checkValidateOrSend400(req, res)

            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            if(candidate) return res.status(400).send({ created: false, description: 'Already exists' })

            const hashPassword = bcrypt.hashSync(password, 8)
            const user = new User({ ...req.body, password: hashPassword })
            user.registeredAt = Date.now()
            await user.save()

            return res.status(201).json({ description: 'Created', created: true, user })
        }catch(e){
            return res.status(400).json({ description: e.message || 'Registration error', created: false })
        }
    }

    static login = async (req, res) => {
        try{
            checkValidateOrSend400(req, res)


            const { email, password } = req.body
            const user = await User.findOne({ email })

            if(!user) return res.status(404).send({ logged: false, description: 'Not found' })

            const isPasswordEquivalent = bcrypt.compareSync(password, user.password)
            if(!isPasswordEquivalent) return res.status(404).send({ logged: false, description: 'Not found' })

            const [ accessToken, refreshToken ] = createTokens(user)

            user.accessToken = accessToken
            user.refreshToken = refreshToken

            await user.save()

            return res
                .status(200)
                .cookie('refreshToken', refreshToken, { httpOnly: true })
                .json({ accessToken, user, logged: true })
        }catch(e){
            return res.status(400).json({ description: e.message, logged: false })
        }
    }

    static refreshAccessToken = async (req, res) => {
        try{
            const { refreshToken } = req.cookies
            console.log(refreshToken)

            const user = await User.findOne({ refreshToken })
            console.log(user)
            if(!user) return res.status(404).json({ description: 'Not found', refreshed: false })

            const accessToken = createAccessToken(user)

            user.accessToken = accessToken

            console.log(user)

            await user.save()

            return res.status(200).json({ accessToken })
        }catch(e){
            return res.status(400).json({ description: e.message || 'Refresh error', created: false })
        }
    }

    static logout = async (req, res) => {
        try{

        }catch(e){
            return res.status(400).json({ description: e.message || 'Logout error', created: false })
        }
    }

    static getAll = async (req, res) => {
        try{
            const users = await User.find()
            console.log(users)
            if(!users.length) return res.status(404).json({ message: 'Not found' })
            return res.status(200).json(users)
        }catch(e){
            return res.status(400).json({ description: e.message, created: false })
        }
    }
}

const checkValidateOrSend400 = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).send({
        created: false,
        description: errors.errors.map(e => e.msg).join('; ')
    })
}

const createTokens = user => {
    const accessToken = createAccessToken(user)
    const refreshToken = createRefreshToken(user)

    return [ accessToken, refreshToken ]
}

const createAccessToken = user => jwt.sign({
    id: user._id,
    email: user.email,
    sex: user.sex,
    height: user.height,
    weight: user.weight,
    age: user.age,
}, JWTSecretKey, { expiresIn: '30s' })

const createRefreshToken = user => jwt.sign({ id: user._id }, JWTSecretKey, { expiresIn: '30 days' })


module.exports = userController