import url from 'url';

export default {
  environment: process.env.NODE_ENV || 'development',
  http: {
    host: process.env.HTTP_HOST || '0.0.0.0',
    port: process.env.HTTP_PORT || '3000',
  },
  knex: {
    client: 'pg',
    debug: false,
    connection: {
      host: url.parse(process.env.DB_PORT).hostname,
      user: process.env.DB_USER,
      port: parseInt(url.parse(process.env.DB_PORT).port, 10),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: `${__dirname}/../db/migrations`,
    },
  },
};
