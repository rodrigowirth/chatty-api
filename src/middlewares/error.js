import { MeaningError } from 'meaning-error';

function present(err) {
  if (err instanceof MeaningError) {
    return {
      title: err.error,
      detail: err.message,
      status: err.getCode(),
    };
  }

  return {
    title: 'internal-server-error',
    detail: 'An unexpected error happened',
    status: 500,
  };
}

export default function (err, req, res, next) { // eslint-disable-line no-unused-vars
  return res
    .status(err.getCode())
    .send(present(err));
}
