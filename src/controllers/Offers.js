import dotenv from 'dotenv';
import selector from '../utils/selector';
import { Offers } from '../models';
import paginationParse from '../utils/pagination';
import * as SelType from '../selectorTypes';

dotenv.config();

const list = async ({ query }, res) => {
  const {
    page,
    limit,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
    idProject: SelType.idProjectType,
  }, query);

  const where = selector({
    idProject: SelType.idProjectType,
  }, query);

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
