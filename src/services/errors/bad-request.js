import BaseError from './base';

export default class NotFoundError extends BaseError {
  constructor(message = 'Bad Request', error = 'bad-request') {
    super(400, message, error);
  }
}
