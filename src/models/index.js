import * as Firebird from './firebird';
import * as Sequelize from './sequelize';

module.exports = {
  ...Firebird,
  ...Sequelize,
};
