
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id')
    table.text('userName').notNullable()
    table.text('recipes')
    table.timestamps('timeStamp')
    table.text('other')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
