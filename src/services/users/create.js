import { BadRequestError, ConflictError } from '../errors';

function sanitize(data) {
  return {
    name: data.name,
    username: data.username,
  };
}

function validate(data) {
  if (!data.name) {
    throw new BadRequestError('Name is a required field', 'missing-name');
  }

  if (!data.username) {
    throw new BadRequestError('Username is a required field', 'missing-username');
  }
}

async function save(knex, data) {
  const POSTGRES_UNIQUE_VALIDATION_ERROR = '23505';

  try {
    const [user] = await knex('users')
      .insert(data)
      .returning('*');

    return user;
  } catch (e) {
    if (e && e.code === POSTGRES_UNIQUE_VALIDATION_ERROR && e.constraint === 'users_username_unique') {
      throw new ConflictError('The username is already taken by another user', 'username-already-taken');
    }
    throw e;
  }
}

export default async function (knex, data) {
  const sanitized = sanitize(data);
  validate(sanitized);
  sanitized.budget = 10;
  return save(knex, sanitized);
}
