import knex from 'knex';

import config from '../src/config';

export default async function () {
  try {
    await knex(config.knex).migrate.latest();
    console.log('Successfully migrated');
    process.exit();
  } catch (e) {
    console.log('Fail to migrated', e);
    process.exit(-1);
  }
}
