const express = require('express')
const router = express.Router()
const queries = require('../queries')

router.post("/", (request, response, next) => {
    // return request.body
    // .then(res => {
        response.status(201).json({request.body});
    // }).catch(next);
})

module.exports = router
