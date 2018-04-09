
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "users"; ALTER SEQUENCE users_id_seq RESTART WITH 6;')
    .then(function () {
      var user = [{
        id: 1,
        userName: 'Chance Scott-Burke',
        recipes: '',
        other: ''
      },{
        id: 2,
        userName: 'Shaun Seidman',
        recipes: '',
        other: ''
      },{
        id: 3,
        userName: 'Dave Aspesi',
        recipes: '',
        other: ''
      },{
        id: 4,
        userName: 'Will Ferens',
        recipes: '',
        other: ''
      },{
        id: 5,
        userName: 'Seth Caparelli',
        recipes: '',
        other: ''
      }]
      return knex('users').insert(user)
    })
}
