const dotenv = require( 'dotenv' )

const result = dotenv.config();
if ( result.error ) throw new Error( 'DoteEnv error' );

const PORT = process.env.PORT || 3000;
const dbHost = process.env.dbHost || 'localhost'
const secretKey = process.env.secretKey
const dbUrl = process.env.dbUrl

module.exports = {
    PORT, dbUrl, dbHost, secretKey
}