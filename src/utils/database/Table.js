/* eslint prefer-destructuring: "off" */

import queryBuilder from './queryBuilder';

class Table {
  constructor(tableName, db) {
    this.tableName = tableName;
    this.db = db;

    this.lastSql = '';
  }

  findAll(query = {}) {
    const select = query.select || null;
    const where = query.where || null;
    const order = query.order || null;

    let qb = queryBuilder()
      .table(this.tableName);

    if (select) {
      qb = qb.select(select);
    } else {
      qb = qb.select();
    }

    if (where) {
      qb = qb.where(where);
    }
    if (order) {
      if (typeof order[1] !== 'undefined') {
        const [field, direction] = order;
        qb = qb.order(field, direction);
      } else {
        const [field] = order;
        qb = qb.order(field);
      }
    }

    this.lastSql = qb.toSql();

    return new Promise((resolve) => {
      this.db.query(this.lastSql, (err, result) => {
        if (err) throw err;

        resolve(result);
      });
    });
  }
}

export default Table;
