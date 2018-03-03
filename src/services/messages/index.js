import create from './create';
import list from './list';

export default function (knex) {
  return {
    create: create.bind(this, knex),
    list: list.bind(this, knex),
  };
}
