require('babel-core/register');
require('babel-polyfill');

require('../db/migrate')
  .default();
