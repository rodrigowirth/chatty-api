import error from '../middlewares/error';
import knex from '../middlewares/knex';
import * as users from './users';

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export default (app) => {
  app.use(knex);

  app.post('/users', wrap(users.create));

  app.use(error);
};
