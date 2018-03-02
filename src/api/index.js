import error from '../middlewares/error';
import knex from '../middlewares/knex';
import * as users from './users';

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export default (app) => {
  app.use(knex);

  app.post('/users', wrap(users.create));

  app.use(error);

  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log(err.stack || err); // eslint-disable-line no-console

    if (err) {
      res.sendStatus(500);
    }
  });
};
