import BaseError from './base';

export default class NotFoundError extends BaseError {
  constructor(error = 'conflict', message = 'Conflict') {
    super(409, error, message);
  }
}
