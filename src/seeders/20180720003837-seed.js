const timestamp = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user = {
  name: 'David Costa',
  email: 'davidcostadev@gmail.com',
  password: 'P@ssword123',
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
