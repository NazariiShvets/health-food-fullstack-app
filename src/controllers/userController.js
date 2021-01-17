const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { JWTSecretKey, cookiesSecretKey } = require("../config");

class userController{
    static registration = async (req, res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).send({
                created: false,
                description: errors.errors.map(e => e.msg).join('; ')
            })

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
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).send({
                logged: false,
                description: errors.errors.map(e => e.msg)
            })

            const { email, password } = req.body
            const user = await User.findOne({ email })

            if(!user) return res.status(404).send({ logged: false, description: 'Not found' })

            const isPasswordEquivalent = bcrypt.compareSync(password, user.password)
            if(!isPasswordEquivalent) return res.status(404).send({ logged: false, description: 'Not found' })

            const token = jwt.sign({
                id: user._id,
                email: user.email,
                sex: user.sex,
                height: user.height,
                weight: user.weight,
                age: user.age,
            }, JWTSecretKey, { expiresIn: '1h' })

            return res.status(200).json({ token, logged: true })
        }catch(e){
            return res.status(400).json({ description: e.message, logged: false })
        }
    }

    // static refresh = async (req, res) => {
    //     try{
    //
    //     }catch(e){
    //         return res.status(400).json({ description: e.message || 'Refresh error', created: false })
    //     }
    // }
    //
    // static logout = async (req, res) => {
    //     try{
    //
    //     }catch(e){
    //         return res.status(400).json({ description: e.message || 'Logout error', created: false })
    //     }
    // }

    static getAll = async (req, res) => {
        try{
            const users = await User.find()
            if(!users.lenght) return res.status(404).json({ message: 'Not found' })
            return res.status(200).json(users)
        }catch(e){
            return res.status(400).json({ description: e.message, created: false })
        }
    }
}


module.exports = userController