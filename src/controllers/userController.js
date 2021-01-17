const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const BlackListToken = require('../models/BlackListToken')
const { JWTSecretKey } = require("../config");

class userController{
    static registration = async (req, res) => {
        try{
            checkValidateOrSend400(req, res)

            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            if(candidate) return res.status(400).send({ created: false, description: 'Already exists' })

            const hashPassword = bcrypt.hashSync(password, 8)
            const user = new User({ ...req.body, password: hashPassword })
            await user.save()

            return res.status(201).json({
                description: 'Created',
                user: returnUserWithoutPassword(user),
                created: true
            })
        }catch(e){
            return res.status(400).json({ description: e.message, created: false })
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

            const { accessToken, refreshToken } = await createTokens(user)

            await user.save()

            return res
                .status(200)
                .cookie('refreshToken', refreshToken, { httpOnly: true })
                .json({ accessToken, user: returnUserWithoutPassword(user), logged: true })
        }catch(e){
            return res.status(400).json({ description: e.message, logged: false })
        }
    }

    static refreshAccessToken = async (req, res) => {
        try{
            const token = req.cookies.refreshToken

            const isWhiteToken = await BlackListToken.findOne({ token })
            if(isWhiteToken) return res.status(400).json({ description: 'BlackList', refreshed: false })

            const { _id } = jwt.verify(token, JWTSecretKey)
            const user = await User.findOne({ _id })
            if(!user) return res.status(404).json({ description: 'Not found', refreshed: false })

            const { accessToken, refreshToken } = createTokens(user)
            await new BlackListToken({ token })

            return res
                .status(200)
                .cookie('refreshToken', refreshToken, { httpOnly: true })
                .json({ accessToken, user: returnUserWithoutPassword(user), refreshed: true })
        }catch(e){
            return res.status(400).json({ description: e.message, refreshed: false })
        }
    }

    static logout = async (req, res) => {
        try{
            const token = req.cookies.refreshToken
            if(!token) return res.status(404).json({ description: 'Already logout', logout: true })
            await new BlackListToken({ token })

            res.status(200).clearCookie('refreshToken').json({ description: 'Logged out', logout: true })
        }catch(e){
            return res.status(400).json({ description: e.message, logout: false })
        }
    }

    static getAll = async (req, res) => {
        try{
            const users = await User.find()
            if(!users.length) return res.status(404).json({ message: 'Not found' })

            return res.status(200).json({ users: users.map(user => returnUserWithoutPassword(user)) })
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
    return { accessToken, refreshToken }
}

const createRefreshToken = user => jwt.sign({ _id: user._id }, JWTSecretKey, { expiresIn: '30 days' })


const createAccessToken = user => jwt.sign(returnUserWithoutPassword(user), JWTSecretKey, { expiresIn: '60s' })

const returnUserWithoutPassword = user => ({
    _id: user._id,
    email: user.email,
    sex: user.sex,
    height: user.height,
    weight: user.weight,
    age: user.age,
    registeredAt: user.registeredAt
})


module.exports = userController