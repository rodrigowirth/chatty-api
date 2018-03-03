import error from '../middlewares/error';
import knex from '../middlewares/knex';
import * as messages from './messages';
import * as users from './users';

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export default (app) => {
  app.use(knex);

  app.post('/users', wrap(users.create));
  app.get('/users/:id', wrap(users.detail));

  app.post('/messages', wrap(messages.create));
  app.get('/messages', wrap(messages.list));
  app.get('/message/:id', wrap(messages.detail));

  app.use(error);
};
