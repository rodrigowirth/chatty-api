import BaseError from './base';

export default class NotFoundError extends BaseError {
  constructor(error = 'bad-request', message = 'Bad Request') {
    super(400, error, message);
  }
}
