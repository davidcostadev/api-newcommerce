// import faker from "faker";
import bcrypt from 'bcrypt';
import config from '../../config/envs';
import models from '../../src/models/sequelize';

/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => {
  const defaultProps = {
    name: 'Ben',
    email: 'ben@domain.com',
    enabled: true,
    password: bcrypt.hashSync('123456', config.BCRYPT_SALT),
  };
  return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */
export default async (props = {}) => models.Users.create(await data(props));
