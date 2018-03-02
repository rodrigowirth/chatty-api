import knex from 'knex';
import config from '../src/config';

const truncateTablesSQL =
  `SELECT Concat('TRUNCATE TABLE "' ,table_schema, '"."', TABLE_NAME, '" RESTART IDENTITY CASCADE;') query
     FROM INFORMATION_SCHEMA.TABLES
     WHERE table_schema = (SELECT current_schema())
      AND TABLE_NAME NOT LIKE 'knex_migrations%'`;

const connection = knex(config.knex);

async function truncateAllTables() {
  const queries = await connection
    .raw(truncateTablesSQL);

  const query = queries.rows.map(sql => sql.query).join('');
  await connection.raw(query);
}

beforeEach(async function () {
  await truncateAllTables();
  this.connection = connection;
});
