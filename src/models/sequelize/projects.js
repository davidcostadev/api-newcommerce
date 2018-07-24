module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  }, {});
  // Projects.associate = ({ Projects }) => {

  // };
  return Projects;
};
