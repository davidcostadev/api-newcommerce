import Firebird from 'node-firebird';
import Table from './Table';

class Database {
  constructor(options, tables) {
    this.host = options.host;
    this.port = options.port;
    this.database = options.database;
    this.password = options.password;

    this.tables = tables;

    this.db = null;
  }

  con() {
    return new Promise((resolve) => {
      const options = {
        host: this.host,
        port: this.port,
        database: this.database,
        password: this.password,
      };

      Firebird.attach(options, (err, db) => {
        if (err) throw err;

        this.db = db;

        this.setTables();

        resolve(this);
      });
    });
  }

  setTables() {
    this.tables.map(tableName => new Table(tableName, this.db));
  }
}

export default Database;
