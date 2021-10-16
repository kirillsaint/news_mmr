'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title', 80).notNullable()
      table.string('text').notNullable()
      table.timestamps()
    })
  }
  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
