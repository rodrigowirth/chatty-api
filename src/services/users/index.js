import create from './create';
import detail from './detail';

export default function (knex) {
  return {
    create: create.bind(this, knex),
    detail: detail.bind(this, knex),
  };
}
