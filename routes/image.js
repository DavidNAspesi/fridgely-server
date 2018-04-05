const express = require('express')
const router = express.Router()
const queries = require('../queries')

router.post("/", (request, response, next) => {
  response.status(201).json(request)
})



module.exports = router
