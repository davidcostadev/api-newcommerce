import bcrypt from 'bcrypt';
import { EXCEPTION_UNPROCESSABLE_ENTITY } from '../errors';
import { authenticate, getUserByEmail, addUser } from '../services/auth';
import config from '../../config/envs';

const login = async (req, res) => {
  try {
    const token = await authenticate(req.body);

    res.json({
      success: true,
      token,
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
    const user = await getUserByEmail(body.email);

    if (user) {
      res.json({
        success: false,
        message: 'Registration failed. User with this email already registered.',
      });
    }

    const newUser = {
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, config.BCRYPT_SALT),
    };

    const entity = await addUser(newUser);

    if (entity) {
      res.json({
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(new Error(EXCEPTION_UNPROCESSABLE_ENTITY));
  }
};

export default {
  register,
  login,
};
