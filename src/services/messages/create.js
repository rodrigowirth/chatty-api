import Joi from 'joi';

import { NotFoundError } from '../errors';
import validate from '../validate';

const schema = Joi.object().keys({
  from: Joi.string().required(),
  to: Joi.string().required(),
  body: Joi.string().required().max(200),
});

async function save(knex, data) {
  const [message] = await knex('messages')
    .insert(data)
    .returning('*');

  return message;
}

export default async function (knex, data) {
  const valid = validate(data, schema);

  const sender = await knex('users')
    .where({ id: valid.from })
    .first();

  if (!sender) {
    throw new NotFoundError('sender-not-found', 'the sender does not exist');
  }

  const recipient = await knex('users')
    .where({ id: valid.to })
    .first();

  if (!recipient) {
    throw new NotFoundError('recipient-not-found', 'the recipient does not exist');
  }

  return save(knex, data);
}
