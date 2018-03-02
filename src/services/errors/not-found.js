import BaseError from './base';

export default class NotFoundError extends BaseError {
  constructor(message = 'Not Found', error = 'not-found') {
    super(404, message, error);
  }
}
