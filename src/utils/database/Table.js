/* eslint prefer-destructuring: "off" */

import queryBuilder from './queryBuilder';

class Table {
  constructor(tableDefinition, db) {
    this.tableName = tableDefinition.tableName;
    this.fields = tableDefinition.fields;

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
      qb = qb.select(this.fields);
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

    if (this.db.logger) {
      console.log('DATABASE: ', this.lastSql);
    }

    return new Promise(async (resolve) => {
      const con = await this.db.con();
      con.query(this.lastSql, (err, result) => {
        if (err) throw err;

        resolve(result);
      });
    });
  }

  findAndCountAll({ where }) {
    const qb = queryBuilder()
      .table(this.tableName)
      .select(['count(*)'])
      .where(where);

    this.lastSql = qb.toSql();

    if (this.db.logger) {
      console.log('DATABASE: ', this.lastSql);
    }

    return new Promise(async (resolve) => {
      const con = await this.db.con();
      con.query(this.lastSql, (err, result) => {
        if (err) throw err;

        resolve(result[0].COUNT);
      });
    });
  }

  static name(name) {
    return name.split(' as ')
      .reverse()
      .find((cur, index) => index === 0);
  }
}

export default Table;
