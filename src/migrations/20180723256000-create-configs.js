module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('Configs', ['ProjectId'], {
      type: 'foreign key',
      name: 'fk_project_config',
      references: {
        table: 'Projects',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'no action',
    });

    await queryInterface.addConstraint('Configs', ['ProjectId', 'name'], {
      type: 'unique',
      name: 'unique_ProjectId_name',
    });
  },
  /**
   * queryInterface
   * Sequelize
   */
  down: async (queryInterface) => {
    await queryInterface.removeConstraint('Configs', 'fk_project_config');
    await queryInterface.removeConstraint('Configs', 'unique_ProjectId_name');
    await queryInterface.dropTable('Configs');
  },
};
