const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRouter = require('./routers/userRouter')

const { PORT, dbUrl } = require('./config')

const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api', userRouter)


const start = async () => {
    try{
        await mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(PORT, () => global.console.log('Server has been started on port ', PORT))

    }catch(e){
        global.console.log('On start server error : ', e)
    }
}

start()

