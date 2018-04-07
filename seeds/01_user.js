
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "users"; ALTER SEQUENCE users_id_seq RESTART WITH 6;')
    .then(function () {
      var user = [{
        id: 1,
        userName: 'Chance Scott-Burke',
        recipes: '35382$http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg$http://www.closetcooking.com/2018/04/slow-cooker-peanut-chicken-sweet-potato.html$Jalapeno_Popper_Grilled_Cheese_Sandwich,',
        other: ''
      },{
        id: 2,
        userName: 'Shaun Seidman',
        recipes: '47024$http://static.food2fork.com/icedcoffee5766.jpg$http://thepioneerwoman.com/cooking/perfect-iced-coffee/$Perfect_Iced_Coffee,',
        other: ''
      },{
        id: 3,
        userName: 'Dave Aspesi',
        recipes: '47746$http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg$https://www.101cookbooks.com/archives/001199.html$Best_Pizza_Dough_Ever,',
        other: ''
      },{
        id: 4,
        userName: 'Will Ferens',
        recipes: '35382$http://static.food2fork.com/ParmesanRoastedPotatoes11985a.jpg$https://whatsgabycooking.com/parmesan-roasted-potatoes/$Parmesan_Roasted_Potatoes,',
        other: ''
      },{
        id: 5,
        userName: 'Seth Caparelli',
        recipes: '54489$http://static.food2fork.com/bananapeanutbuttericecream5c16d.jpg$https://www.twopeasandtheirpod.com/two-ingredient-banana-peanut-butter-ice-cream/$TwoIngredient_Banana_Peanut_Butter_Ice_Cream,',
        other: ''
      }]
      return knex('users').insert(user)
    })
}
