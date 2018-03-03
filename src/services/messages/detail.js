import Joi from 'joi';

import { NotFoundError } from '../errors';

const schema = Joi.object().keys({
  id: Joi.number().integer().required(),
});

function throwNotFound() {
  throw new NotFoundError('message-not-found', 'The message was not found');
}

function validate(data) {
  const { value, error } = Joi.validate(data, schema);

  if (error) {
    throwNotFound();
  }

  return value;
}

export default async function (knex, id) {
  const { id: safeId } = validate({ id }, schema);

  const message = await knex('messages')
    .where({ id: safeId })
    .first();

  if (!message) {
    throwNotFound();
  }

  return message;
}
