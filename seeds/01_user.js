
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "users"; ALTER SEQUENCE users_id_seq RESTART WITH 6;')
    .then(function () {
      var user = [{
        id: 1,
        userName: 'Chance Scott-Burke',
        recipes: '47102$http://static.food2fork.com/4983866032_304b02a819_o22e2.jpg$https://thepioneerwoman.com/cooking/2010/09/chocolate-chip-cookie-sweet-rolls/$Chocolate_Chip_Cookie_Sweet_Rolls,',
        other: ''
      },{
        id: 2,
        userName: 'Shaun Seidman',
        recipes: '47102$http://static.food2fork.com/4983866032_304b02a819_o22e2.jpg$https://thepioneerwoman.com/cooking/2010/09/chocolate-chip-cookie-sweet-rolls/$Chocolate_Chip_Cookie_Sweet_Rolls,',
        other: ''
      },{
        id: 3,
        userName: 'Dave Aspesi',
        recipes: '47102$http://static.food2fork.com/4983866032_304b02a819_o22e2.jpg$https://thepioneerwoman.com/cooking/2010/09/chocolate-chip-cookie-sweet-rolls/$Chocolate_Chip_Cookie_Sweet_Rolls,',
        other: ''
      },{
        id: 4,
        userName: 'Will Ferens',
        recipes: '47102$http://static.food2fork.com/4983866032_304b02a819_o22e2.jpg$https://thepioneerwoman.com/cooking/2010/09/chocolate-chip-cookie-sweet-rolls/$Chocolate_Chip_Cookie_Sweet_Rolls,',
        other: ''
      },{
        id: 5,
        userName: 'Seth Caparelli',
        recipes: '47102$http://static.food2fork.com/4983866032_304b02a819_o22e2.jpg$https://thepioneerwoman.com/cooking/2010/09/chocolate-chip-cookie-sweet-rolls/$Chocolate_Chip_Cookie_Sweet_Rolls,',
        other: ''
      }]
      return knex('users').insert(user)
    })
}
