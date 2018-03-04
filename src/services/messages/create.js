import Joi from 'joi';

import { BadRequestError, NotFoundError } from '../errors';
import validate from '../validate';

const schema = Joi.object().keys({
  from: Joi.string().required(),
  to: Joi.string().required(),
  body: Joi.string().required().max(200),
});

function save(knex, data) {
  return knex.transaction(async (transaction) => {
    const [message] = await knex('messages')
      .transacting(transaction)
      .insert(data)
      .returning('*');

    await knex('users')
      .decrement('budget', 1)
      .where({ id: data.to })
      .andWhere('budget', '>', 0);

    return message;
  });
}

export default async function (knex, data) {
  const valid = validate(data, schema);

  const sender = await knex('users')
    .where({ id: valid.from })
    .first();

  if (!sender) {
    throw new NotFoundError('sender-not-found', 'the sender does not exist');
  }

  if (!sender.budget) {
    throw new BadRequestError('no-budget', 'User has no budget');
  }

  const recipient = await knex('users')
    .where({ id: valid.to })
    .first();

  if (!recipient) {
    throw new NotFoundError('recipient-not-found', 'the recipient does not exist');
  }

  return save(knex, valid);
}
