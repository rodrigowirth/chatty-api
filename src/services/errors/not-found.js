import BaseError from './base';

export default class NotFoundError extends BaseError {
  constructor(error = 'not-found', message = 'Not Found') {
    super(404, error, message);
  }
}
