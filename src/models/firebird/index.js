import dotenv from 'dotenv';
import path from 'path';
import Database from '../../utils/database/Database';
import Table from '../../utils/database/Table';
import { getFilesModels } from '../../utils/database/model';

dotenv.config();

const tables = {};
const basename = path.basename(__filename);

const db = new Database({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logger: process.env.DB_LOGGER,
});

/* eslint import/no-dynamic-require: "off" */
/* eslint global-require: "off" */
getFilesModels(basename, __dirname).forEach((file) => {
  const model = require(file).default;

  tables[Table.name(model.tableName)] = new Table(model, db);
});

module.exports = tables;
