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


function runTheLoop() {
    let nameStuff = ''
    const app = new Clarifai.App({
    apiKey: theApiKey
    })
    //app.models.predict(Clarifai.FOOD_MODEL, req.savedUrl)
    app.models.predict(Clarifai.FOOD_MODEL, 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Yours_Food_Logo.jpg')
        .then(function(response) {
          return response.outputs[0].data.concepts[1].name
        })
        .then(function(res) {
          console.log(res)
          runThisShit(res)
        })
        .catch(function(err) {
          console.error(err)
        })
}

// runTheLoop()
let poopypoopypants = ''
function runThisShit(foodItems) {
  console.log("made it to runThisShit")
  let foodURL = 'http://food2fork.com/api/search?key=5761d9561765b7936c21a38f6afa5786&q=' + foodItems
  fetch(foodURL)
  .then(function(res) {
    return res.json()
  })
  .then(function(res) {
    for (let i=0;i<15;i++) {
      console.log(res.recipes[i].title + res.recipes[i].recipe_id)
    }
    var poopypoopypants = res.recipes
  })
  .catch(function(err) {
    console.log(err)
  })
  return poopypoopypants
}
app.post("/upload", upload.single("photo"), (req, res) => {
  runTheLoop()
  res.send({
    // url: req.savedUrl,
    data: runTheLoop()
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
