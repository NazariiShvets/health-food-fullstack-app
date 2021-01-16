const router = require( 'express' ).Router()
const { check } = require( 'express-validator' )
const userController = require( "../controllers/userController" );

router.use( '/register', [
    check( 'email', 'Incorrect email' ).isEmail(),
    check( 'password', 'Password min length = 5 , max length = 25' ).isLength( { min: 5, max: 25 } ),
    check( 'sex', 'Incorrect sex. Use : \'Male\', \'Female\', \'Other\' ' ).isIn( [ 'Male', 'Female', 'Other' ] ),
    check( 'age', 'Incorrect age' ).isInt(),
    check( 'weight', 'Incorrect weight' ).isInt(),
    check( 'height', 'Incorrect height' ).isInt(),
], userController.registration )


module.exports = router