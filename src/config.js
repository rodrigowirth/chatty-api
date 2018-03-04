import url from 'url';

export default {
  cors: process.env.CORS === 'true',
  docsUrl: process.env.DOCS_URL,
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
