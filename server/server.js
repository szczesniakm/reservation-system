require("dotenv").config();
require('express-async-errors')

const express = require('express')
const mongoose = require('mongoose')

const { errorHandler } = require('./middleware/error-handler')

const reservationRouter = require('./routes/reservationsRoutes')
const loginRouter = require('./routes/loginRoutes')
const userRouter = require('./routes/userRoutes')
const hostRouter = require('./routes/hostRoutes')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/login', loginRouter)
app.use('/api/reservations', reservationRouter)
app.use('/api/users', userRouter)
app.use('/api/hosts', hostRouter)

app.use(errorHandler)

mongoose.connect(process.env.MONGO_CONN, {
    useNewUrlParser: true 
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})
