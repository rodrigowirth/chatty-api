import { NotFoundError } from '../errors';

export default async function (knex, id) {
  const safeId = parseInt(id, 10);

  if (Number.isNaN(safeId)) {
    throw new NotFoundError('The user was not found', 'user-not-found');
  }

  const user = await knex('users')
    .where({ id: safeId })
    .first();

  if (!user) {
    throw new NotFoundError('The user was not found', 'user-not-found');
  }

  return user;
}
