import Joi from 'joi';

import { NotFoundError } from '../errors';

const schema = Joi.object().keys({
  id: Joi.number().integer().required(),
});

function throwNotFound() {
  throw new NotFoundError('user-not-found', 'The user was not found');
}

function validate(data) {
  const { value, error } = Joi.validate(data, schema, { abortEarly: false });

  if (error) {
    throwNotFound();
  }

  return value;
}

export default async function (knex, id) {
  const { id: safeId } = validate({ id });

  const user = await knex('users')
    .where({ id: safeId })
    .first();

  if (!user) {
    throwNotFound();
  }

  return user;
}
