export function up(knex) {
  return knex
    .schema
    .createTable('messages', (table) => {
      table.increments('id')
        .primary();
      table.integer('from')
        .notNullable()
        .references('id')
        .inTable('users');
      table.integer('to')
        .notNullable()
        .references('id')
        .inTable('users');
      table.string('body')
        .notNullable();
      table.timestamp('sentAt')
        .defaultTo(knex.fn.now());
    });
}

export function down(knex) {
  return knex
    .schema
    .dropTable('messages');
}
