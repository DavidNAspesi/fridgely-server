require ("dotenv").load()
const express = require("express")
const app = express()
const multer = require('multer')
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const multerS3 = require("multer-s3")
const aws = require("aws-sdk")
const fetch = require('node-fetch')
const Clarifai = require('clarifai')

const theApiKey = 'd6b1c7e0f3804ee693677ebe07e9e490'

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors())

app.use('/user', require('./routes/user'))

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
      cb(null, fileName);
    }
  })
})

function runClarifai(image) {
    let nameStuff = ''
    const app = new Clarifai.App({
    apiKey: theApiKey
    })
<<<<<<< HEAD
    return app.models.predict(Clarifai.FOOD_MODEL, image)
        .then(response => {
=======
    // console.log(AWSImage);
    // return app.models.predict(Clarifai.FOOD_MODEL, req.savedUrl)
    return app.models.predict(Clarifai.FOOD_MODEL, 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Yours_Food_Logo.jpg')
        .then(function(response) {
>>>>>>> c38a87375fec4789a167844788d5e6a57e0f9880
          return response.outputs[0].data.concepts[1].name
        })
        .then(res => {
          console.log(res)
          return runThisShit(res)
        })
}

function runThisShit(foodItems) {
  console.log("made it to runFood2Fork")
  console.log(global.globalString);

  let foodURL = 'http://food2fork.com/api/search?key=5761d9561765b7936c21a38f6afa5786&q=' + foodItems
  return fetch(foodURL)
  .then(res => {
    return res.json()
  })
  .then(res => {
    console.log(res)
  })
}

app.post("/upload", upload.single("photo"), (req, res, next) => {
<<<<<<< HEAD
  console.log(req.file.location)
  runClarifai(req.file.location)
  .then(results => {
=======
  runTheLoop().then(function(results) {
    console.log(req.file.filename);
>>>>>>> c38a87375fec4789a167844788d5e6a57e0f9880
    res.json({
      // url:req.file.location,
      url: req.savedUrl,
      data: results
    })
  })
  .catch(next)
})

app.use((req, res, next) => {
    const err = new Error("Not Found")
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
  console.log('ERROR', err);
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err.stack : {}
  })
})

module.exports = app
