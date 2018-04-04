
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "users"; ALTER SEQUENCE users_id_seq RESTART WITH 6;')
    .then(function () {
      var user = [{
        id: 1,
        userName: 'Chance Scott-Burke',
        recipes: '35382$http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg$http://www.closetcooking.com/2018/04/slow-cooker-peanut-chicken-sweet-potato.html$Jalapeno_Popper_Grilled_Cheese_Sandwich',
        other: ''
      },{
        id: 2,
        userName: 'Shaun Seidman',
        recipes: '35382$http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg$http://www.closetcooking.com/2018/04/slow-cooker-peanut-chicken-sweet-potato.html$Jalapeno_Popper_Grilled_Cheese_Sandwich',
        other: ''
      },{
        id: 3,
        userName: 'Dave Aspesi',
        recipes: '35382$http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg$http://www.closetcooking.com/2018/04/slow-cooker-peanut-chicken-sweet-potato.html$Jalapeno_Popper_Grilled_Cheese_Sandwich',
        other: ''
      },{
        id: 4,
        userName: 'Will Ferens',
        recipes: '35382$http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg$http://www.closetcooking.com/2018/04/slow-cooker-peanut-chicken-sweet-potato.html$Jalapeno_Popper_Grilled_Cheese_Sandwich',
        other: ''
      },{
        id: 5,
        userName: 'Seth Caparelli',
        recipes: '35382$http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg$http://www.closetcooking.com/2018/04/slow-cooker-peanut-chicken-sweet-potato.html$Jalapeno_Popper_Grilled_Cheese_Sandwich',
        other: ''
      }]
      return knex('users').insert(user)
    })
}
