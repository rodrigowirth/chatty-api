import config from '../config';
import { BaseError } from '../services/errors';

function buildUnexpectedError() {
  return {
    title: 'internal-server-error',
    details: ['Unexpected Error'],
    status: 500,
  };
}

function presentJoiError(err) {
  const joi = err.getError();

  const details = joi.details
    .map(detail => detail.message);

  return {
    details,
    status: err.getCode(),
    title: 'invalid-data',
  };
}

function presentBaseError(err) {
  return {
    details: [err.getMessage()],
    status: err.getCode(),
    title: err.getError(),
  };
}

function present(err) {
  if (!(err instanceof BaseError)) {
    console.error('error: ', err); // eslint-disable-line no-console
    return buildUnexpectedError();
  }

  if (err.getError().isJoi) {
    return presentJoiError(err);
  }

  return presentBaseError(err);
}

export default function (err, req, res, next) { // eslint-disable-line no-unused-vars
  const response = present(err);
  response.instance = config.docsUrl;

  return res
    .status(response.status)
    .send(response);
}
