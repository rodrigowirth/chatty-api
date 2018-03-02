import BaseError from './base';

export default class NotFoundError extends BaseError {
  constructor(message = 'Conflict', error = 'conflict') {
    super(409, message, error);
  }
}
