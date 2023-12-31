require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index.js')
const errorMiddleware = require('./middlewares/error-middleware.js')

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use('/api', router)
app.use(errorMiddleware) // обязательно подключать в самом конце цепочки middlewares

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log(`Server started on Port =  ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()
