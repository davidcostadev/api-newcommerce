/* eslint no-use-before-define: "off" */

import whereBuilder from './where';

const fieldsQuery = fields => fields
  .map(field => field
    .split(' as ')
    .map(each => each.trim())
    .map((curr, index) => (
      index === 1 ? `"${curr}"` : curr
    ))
    .join(' as '))
  .join(', ');

const ifISAll = fields => (
  fields.length ? fieldsQuery(fields) : '*'
);

const first = sql => () => (
  query({
    ...sql,
    first: 'SELECT',
  })
);

const select = sql => (fields = []) => (
  query({
    ...sql,
    select: `\t${ifISAll(fields)}`,
  })
);

const table = sql => tableName => (
  query({
    ...sql,
    table: `FROM\n\t${tableName}`,
  })
);

const where = sql => fields => query({
  ...sql,
  where: whereBuilder(fields),
});

const order = sql => (field, direction = 'ASC') => (
  query({
    ...sql,
    order: `ORDER BY ${field} ${direction}`,
  })
);

const limit = sql => (quant = 30, page = 1) => (
  query({
    ...sql,
    limit: `FIRST ${quant} SKIP ${(page - 1) * quant}`,
  })
);

const orderSql = [
  'first',
  'limit',
  'select',
  'table',
  'where',
  'order',
];

const toSql = sql => () => {
  const newSql = [];
  orderSql.forEach(item => typeof sql[item] === 'undefined' || newSql.push(sql[item]));

  return newSql.join('\n');
};

const build = sql => () => sql;

const query = (sql = {}) => ({
  first: first(sql),
  select: select(sql),
  table: table(sql),
  where: where(sql),
  limit: limit(sql),
  order: order(sql),
  build: build(sql),
  toSql: toSql(sql),
});

export default query().first;
