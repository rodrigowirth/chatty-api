import Joi from 'joi';

import { BadRequestError } from './errors';

export default function (data, schema) {
  const { value, error } = Joi.validate(data, schema);

  if (error) {
    throw new BadRequestError(error);
  }

  return value;
}
