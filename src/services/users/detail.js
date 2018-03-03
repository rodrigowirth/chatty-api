import Joi from 'joi';

import validate from '../validate';
import { NotFoundError } from '../errors';

const schema = Joi.object().keys({
  id: Joi.number().integer().required(),
});

export default async function (knex, id) {
  const { id: safeId } = validate({ id }, schema);

  const user = await knex('users')
    .where({ id: safeId })
    .first();

  if (!user) {
    throw new NotFoundError('user-not-found', 'The user was not found');
  }

  return user;
}
