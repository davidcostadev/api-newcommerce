/* eslint prefer-destructuring: "off" */

import queryBuilder from './queryBuilder';
import { revertAlias, getField, trateResult } from './model';

class Table {
  constructor(tableDefinition, db) {
    this.tableName = tableDefinition.tableName;
    this.fields = tableDefinition.fields;
    this.id = tableDefinition.id;

    this.db = db;

    this.lastSql = '';
  }

  findAll(query = {}) {
    const select = query.select || null;
    const where = query.where || null;
    const order = query.order || null;
    const limit = query.limit || 30;
    const page = query.page || 1;

    let qb = queryBuilder()
      .table(this.tableName)
      .limit(limit, page);

    if (select) {
      qb = qb.select(select);
    } else {
      qb = qb.select(this.fields);
    }

    if (where && Object.keys(where).length) {
      qb = qb.where(revertAlias(where, this.fields));
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

    this.logger();

    return new Promise(async (resolve) => {
      try {
        const con = await this.db.con();

        con.query(this.lastSql, async (err, result) => {
          if (err) throw err;

          const newDate = await trateResult(result);

          resolve(newDate);
        });
      } catch (e) {
        console.error(e);
      }
    });
  }

  findAndCountAll({ where }) {
    let qb = queryBuilder()
      .table(this.tableName)
      .select([`count(${getField(this.fields, this.id)})`]);

    if (where && Object.keys(where).length) {
      qb = qb.where(revertAlias(where, this.fields));
    }

    this.lastSql = qb.toSql();

    this.logger();

    return new Promise(async (resolve) => {
      try {
        const con = await this.db.con();

        con.query(this.lastSql, (err, result) => {
          if (err) throw err;

          resolve(result[0].COUNT);
        });
      } catch (e) {
        console.error(e);
      }
    });
  }

  findById(id, select = null) {
    let qb = queryBuilder()
      .table(this.tableName)
      .where({
        [getField(this.fields, this.id)]: id,
      })
      .limit(1);

    if (select) {
      qb = qb.select(select);
    } else {
      qb = qb.select(this.fields);
    }

    this.lastSql = qb.toSql();

    this.logger();

    return new Promise(async (resolve) => {
      try {
        const con = await this.db.con();

        con.query(this.lastSql, async (err, result) => {
          if (err) throw err;

          const newDate = await trateResult(result.find((cur, index) => index === 0));

          resolve(newDate);
        });
      } catch (e) {
        console.error(e);
      }
    });
  }

  static name(name) {
    return name.split(' as ')
      .reverse()
      .find((cur, index) => index === 0);
  }

  logger() {
    if (this.db.logger) {
      console.log(`DATABASE: \`${this.lastSql}\``);
    }
  }
}

export default Table;
