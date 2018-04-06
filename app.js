require ("dotenv").load()
const express = require("express")
const app = express()
const multer = require('multer')
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const multerS3 = require("multer-s3")
const aws = require("aws-sdk")

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors())

app.use('/user', require('./routes/user'))

// app.post('/image', upload.single('image'), function (req, res) {
//   console.log(req.body)
//   res = res.status(201)
//
//   res.send(req.body)
// })

const s3 = new aws.S3({
  apiVersion: "2006-03-01",
  region: "us-west-2",
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID
  }
})

const upload = multer({

  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key(req, file, cb) {
      var fileName = new Date().toISOString().replace(/:/g, '-') + '.jpg'
      req.savedUrl = `https://s3.amazonaws.com/s3/buckets/fridgely/${fileName}`
      cb(null, fileName);
    }
  })
})

app.post("/upload", upload.single("photo"), (req, res) => {
  res.send({
    url: req.savedUrl,
    file: req.file
  })
});

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
