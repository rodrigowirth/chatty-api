import knex from 'knex';

import config from '../config';

let instance;

export default function (req, res, next) {
  if (!instance) {
    instance = knex(config.knex);
  }

  req.knex = instance;

  next();
}
