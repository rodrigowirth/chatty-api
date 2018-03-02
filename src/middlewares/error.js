import { MeaningError } from 'meaning-error';

export default function (err, req, res, next) {
  if (!(err instanceof MeaningError)) {
    return next(err, req, res);
  }

  const data = {
    title: err.error,
    detail: err.message,
    status: err.getCode(),
  };

  return res
    .status(err.getCode())
    .send(data);
}
