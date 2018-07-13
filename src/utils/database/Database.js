import Firebird from 'node-firebird';

class Database {
  constructor(options) {
    this.host = options.host;
    this.port = options.port;
    this.database = options.database;
    this.user = options.user;
    this.password = options.password;
    this.logger = options.logger;

    this.db = null;
  }

  con() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const options = {
        host: this.host,
        port: this.port,
        user: this.user,
        database: this.database,
        password: this.password,
      };

      Firebird.attach(options, (err, db) => {
        if (err) reject(err);

        this.db = db;

        resolve(db);
      });
    });
  }
}

export default Database;
