import Joi from 'joi';

import validate from '../validate';
import { ConflictError } from '../errors';

const schema = Joi.object().keys({
  name: Joi.string().required(),
  username: Joi.string().trim().lowercase().required(),
});

async function save(knex, data) {
  const POSTGRES_UNIQUE_VALIDATION_ERROR = '23505';

  try {
    const [user] = await knex('users')
      .insert(data)
      .returning('*');

    return user;
  } catch (e) {
    if (e && e.code === POSTGRES_UNIQUE_VALIDATION_ERROR && e.constraint === 'users_username_unique') {
      throw new ConflictError('username-already-taken', 'The username is already taken by another user');
    }
    throw e;
  }
}

export default async function (knex, data) {
  const valid = validate(data, schema);
  valid.budget = 10;
  return save(knex, valid);
}
