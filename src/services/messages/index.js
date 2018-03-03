import create from './create';

export default function (knex) {
  return {
    create: create.bind(this, knex),
  };
}
