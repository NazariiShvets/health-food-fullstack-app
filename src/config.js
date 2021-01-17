const dotenv = require('dotenv')

const result = dotenv.config();
if(result.error) throw new Error('DoteEnv error');

const PORT = process.env.PORT || 3000;
const dbHost = process.env.dbHost || 'localhost'
const JWTSecretKey = process.env.JWTSecretKey
const dbUrl = process.env.dbUrl
const cookiesSecretKey = process.env.cookiesSecretKey

module.exports = {
    PORT, dbUrl, dbHost, JWTSecretKey, cookiesSecretKey
}