const express = require("express")
const app = express()

const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors())

app.use('/user', require('./routes/user'))

app.post('/image', function (req, res) {
  console.log(req.body)



  res = res.status(201)
  res.send(req.body)
})

// app.use('/image', require('./routes/image'))

app.use((req, res, next) => {
    const err = new Error("Not Found")
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: req.app.get("env") === "development" ? err.stack : {}
    })
})

module.exports = app
