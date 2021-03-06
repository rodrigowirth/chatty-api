import ExtendableError from 'es6-error';

export default class BaseError extends ExtendableError {
  constructor(code = 500, error = 'server-error', message = 'Server Error') {
    super(message);

    this.code = code;
    this.error = error;
    this.message = message;
  }

  getCode() {
    return this.code;
  }

  getError() {
    return this.error;
  }

  getMessage() {
    return this.message;
  }
}
