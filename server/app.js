const express = require ('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()

const app = express()

app.get('/', async (req, res, next) => {
    console.log('hello from expr.')
})

//using http-errors
app.use(async (req, res, next) => {
    next(createError.NotFound())
  })

//error handler
app.use((err, req, res, next) => {
res.status(err.status || 500)
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    })
  })


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`a server is running on port ${PORT}`)
})

