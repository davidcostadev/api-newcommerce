import bcrypt from 'bcrypt';
import { EXCEPTION_UNPROCESSABLE_ENTITY, EXCEPTION_EMAIL_DUPLICATED } from '../errors';
import { authenticate, getUserByEmail, addUser } from '../services/auth';
import { Users } from '../models/sequelize';
import config from '../../config/envs';

const login = async (req, res) => {
  try {
    const {
      token,
      payload,
    } = await authenticate(Users)(req.body);

    res.json({
      success: true,
      token,
      payload,
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

const register = async ({ body }, res) => {
  try {
    const user = await getUserByEmail(Users)(body.email);

    if (user) {
      throw new Error(EXCEPTION_EMAIL_DUPLICATED);
    }

    const newUser = {
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, config.BCRYPT_SALT),
    };

    const entity = await addUser(Users)(newUser);

    if (entity) {
      res.json({
        success: true,
      });
    }
  } catch (e) {
    if (e.message === EXCEPTION_EMAIL_DUPLICATED) {
      res.status(400).json({
        success: false,
        message: EXCEPTION_EMAIL_DUPLICATED,
      });
    } else {
      console.error(e);
      res.status(400).send(new Error(EXCEPTION_UNPROCESSABLE_ENTITY));
    }
  }
};

export default {
  register,
  login,
};