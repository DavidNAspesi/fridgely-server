const express = require('express')
const router = express.Router()
const queries = require('../queries')

router.get("/", (request, response, next) => {
    queries.list().then(users => {
        response.json({users})
    }).catch(next)
})

router.get("/:id", (request, response, next) => {
    queries.read(request.params.id).then(users => {
        if(users) { response.json({users}) } else {response.status(404).json({message: 'Nothing Here'})}
    }).catch(next);
});

router.get("/recipes/:id", (request, response, next) => {
    queries.read(request.params.id).then(users => {
        if(users) { response.json({
          for (var i=0;i<users.users.recipes.split(',').length; i++) {
            var eachRecipe =  users.users.recipes.split(',')[i]
            var pieceOfRecipe = eachRecipe.split('$')
          }
          response.json({pieceOfRecipe})
        }) } else {response.status(404).json({message: 'Nothing Here'})}
    }).catch(next);
});

router.post("/", (request, response, next) => {
    queries.create(request.body)
    .then(users => {
        response.status(201).json({users});
    }).catch(next);
});

router.delete("/:id", (request, response, next) => {
    queries.delete(request.params.id).then(() => {
        response.status(204).json({deleted: true});
    }).catch(next);
});

router.put("/:id", (request, response, next) => {
    queries.update(request.params.id, request.body).then(users => {
        response.json({users});
    }).catch(next);
});

module.exports = router
