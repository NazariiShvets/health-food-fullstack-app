const bcrypt = require( 'bcryptjs' )
const User = require( '../models/User' )
const { validationResult } = require( 'express-validator' )

class userController {
    static registration = async ( req, res ) => {
        try {
            const errors = validationResult( req )
            if ( !errors.isEmpty() ) return res.status( 400 ).send( {
                created: false,
                description: errors.errors.map( e => e.msg )
            } )

            const { email, password } = req.body
            const candidate = await User.findOne( { email } )
            if ( candidate ) return res.status( 400 ).send( { created: false, description: 'Already exists' } )

            const hashPassword = bcrypt.hashSync( password, 8 )
            const user = new User( { ...req.body, password: hashPassword } )
            user.registeredAt = Date.now()
            await user.save()

            return res.status( 201 ).json( { description: 'Created', created: true, user } )
        } catch ( e ) {
            return res.status( 400 ).json( { description: e.message || 'Registration error', created: false } )
        }
    }
}


module.exports = userController