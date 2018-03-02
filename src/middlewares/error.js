import { BaseError } from '../services/errors';

function present(err) {
  if (err instanceof BaseError) {
    return {
      detail: err.getMessage(),
      status: err.getCode(),
      title: err.getError(),
    };
  }

  console.error('error: ', err); // eslint-disable-line no-console

  return {
    title: 'internal-server-error',
    detail: 'Unexpected Error',
    status: 500,
  };
}

export default function (err, req, res, next) { // eslint-disable-line no-unused-vars
  const response = present(err);

  return res
    .status(response.status)
    .send(response);
}
