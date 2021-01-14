const dotenv = require('dotenv')

const result = dotenv.config();
if (result.error) throw new Error('DoteEnv error');

const PORT = process.env.PORT || 3000;
const dbHost = process.env.dbHost || 'localhost'
const dbName = process.env.dbName
const dbRootName = process.env.dbRootName
const dbRootPassword = process.env.dbRootPassword


module.exports = {
    PORT, dbName, dbRootName, dbRootPassword
}