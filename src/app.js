const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { PORT, dbName, dbRootName, dbRootPassword } = require('./config')
const authRouter = require('./routes/auth')

const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)



mongoose.connect(`mongodb+srv://${dbRootName}:${dbRootPassword}@cluster0.soqyn.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) return console.log(err);

        app.listen(PORT, () => console.log(`Server has been started at port ${PORT}`))
    }
);

