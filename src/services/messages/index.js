import create from './create';
import detail from './detail';
import list from './list';

export default function (knex) {
  return {
    create: create.bind(this, knex),
    detail: detail.bind(this, knex),
    list: list.bind(this, knex),
  };
}
