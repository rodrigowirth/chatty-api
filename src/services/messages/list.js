import Joi from 'joi';

import validate from '../validate';
import { NotFoundError } from '../errors';

const schema = Joi.object().keys({
  to: Joi.number().integer().required(),
});

export default async function (knex, query) {
  const valid = validate(query, schema);

  const recipient = await knex('users')
    .where({ id: valid.to })
    .first();

  if (!recipient) {
    throw new NotFoundError('recipient-not-found', 'the recipient does not exist');
  }

  return knex('messages')
    .where({ to: valid.to })
    .select();
}
