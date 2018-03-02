export function up(knex) {
  return knex
    .schema
    .createTable('users', (table) => {
      table.increments('id')
        .primary();
      table.string('name')
        .notNullable();
      table.string('username')
        .notNullable();
      table.integer('budget')
        .notNullable();
      table.timestamp('createdAt')
        .defaultTo(knex.fn.now());
      table.timestamp('updatedAt')
        .defaultTo(knex.fn.now());
    });
}

export function down(knex) {
  return knex
    .schema
    .dropTable('users');
}
