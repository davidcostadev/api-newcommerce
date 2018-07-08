import dotenv from 'dotenv';
import { Offers } from '../models';
import paginationParse from '../utils/pagination';

dotenv.config();

const list = async ({ query }, res) => {
  const page = parseInt(query.page || 1, 10);
  const limit = parseInt(query.limit || 30, 10);
  const where = {
    idProject: process.env.PROJECT_ID,
  };

  try {
    const data = await Offers.findAll({ where, limit, page });
    const count = await Offers.findAndCountAll({ where });
    const pagination = paginationParse(count, page, limit);

    res.json({
      data,
      pagination,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

const get = async ({ params }, res) => {
  try {
    const entity = await Offers.findById(params.idOffer);

    res.json(entity);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export default {
  list,
  get,
};
