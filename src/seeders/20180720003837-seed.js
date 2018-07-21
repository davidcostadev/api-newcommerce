const bcrypt = require('bcrypt');
const config = require('../../config/envs');

const timestamp = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user = {
  name: 'Admin',
  email: 'admin@newcommerce.com',
  password: bcrypt.hashSync('P@ssword123', config.BCRYPT_SALT),
  enabled: true,
  ...timestamp,
};

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [user]);
  },
  down: (queryInterface) => {
    queryInterface.bulkDelete('Users');
  }, /* queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => (
      queryInterface.bulkDelete('Users', null, { truncate: true })
        .then(() => (
          queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
        ))
    )), */
};
