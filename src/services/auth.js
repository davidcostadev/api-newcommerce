import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/envs';
import { Users } from '../models/sequelize';

export const addUser = user => Users.create(user);

export const getUserByEmail = email => Users.findOne({ where: { email } });

export const authenticate = params => Users.findOne({
  where: {
    email: params.email,
  },
  raw: true,
}).then((user) => {
  if (!user) {
    throw new Error('Authentication failed. User not found.');
  }

  if (!bcrypt.compareSync(params.password, user.password)) {
    throw new Error('Authentication failed. Wrong password.');
  }

  const payload = {
    email: user.email,
    id: user.id,
    time: new Date(),
  };

  const token = jwt.sign(payload, config.JWT_ENCRYPTION, {
    expiresIn: config.JWT_EXPIRATION,
  });

  return token;
});
