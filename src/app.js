import bodyParser from 'body-parser';
import express from 'express';
// import knex from 'knex';

import api from './api';

const app = express();

app.use(bodyParser.json());

api(app);

export default app;
