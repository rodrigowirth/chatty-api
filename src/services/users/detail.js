import { NotFoundError } from '../errors';

export default async function (knex, id) {
  const safeId = parseInt(id, 10);

  if (Number.isNaN(safeId)) {
    throw new NotFoundError('user-not-found', 'The user was not found');
  }

  const user = await knex('users')
    .where({ id: safeId })
    .first();

  if (!user) {
    throw new NotFoundError('user-not-found', 'The user was not found');
  }

  return user;
}
