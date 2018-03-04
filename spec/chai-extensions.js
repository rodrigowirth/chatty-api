import config from '../src/config';

export default function (chai, utils) { // eslint-disable-line no-unused-vars
  const { Assertion } = chai;
  Assertion.addMethod('error', function (status, title, message) {
    const error = this._obj; // eslint-disable-line no-underscore-dangle

    this.assert(
      error.status === status,
      `expected it to have status "${status}" but got "${error.status}"`,
      `expected it to not have status "${status}" but got "${error.status}"`,
    );

    this.assert(
      error.title === title,
      `expected it to have title "${title}" but got "${error.title}"`,
      `expected it to not have title "${title}" but got "${error.title}"`,
    );

    const hasDetail = error.details && error.details.indexOf(message) >= 0;

    this.assert(
      hasDetail,
      `expected it detail(s) to have message "${message}" but got "${error.details}"`,
      `expected it detail(s) to not have message "${message}" but got "${error.details}"`,
    );

    this.assert(
      error.instance === config.docsUrl,
      `expected it to have instance "${config.docsUrl}" but got "${error.instance}"`,
      `expected it to not have instance "${config.docsUrl}" but got "${error.instance}"`,
    );
  });
}
