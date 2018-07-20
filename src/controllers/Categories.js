import selector from '../utils/selector';
import { Categories } from '../models/firebird';
import paginationParse from '../utils/pagination';
import * as SelType from '../selectorTypes';
import { EXCEPTION_NOT_FOUND, EXCEPTION_REQUEST_INVALID } from '../errors';

const list = async ({ query }, res) => {
  const {
    page,
    limit,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
  }, query);

  const where = selector({
    idOffer: SelType.idProjectType,
  }, query);

  try {
    const data = await Categories.findAll({ where, limit, page });
    const count = await Categories.findAndCountAll({ where });
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
  const {
    id,
  } = selector({
    id: SelType.id,
  }, params);

  if (!id) {
    res.status(400).send(EXCEPTION_REQUEST_INVALID);
  }

  try {
    const entity = await Categories.findById(id);

    if (!entity) {
      res.status(404).send(EXCEPTION_NOT_FOUND);
    }

    res.json(entity);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

const byOffers = ({ query, params }, res) => list({
  query: {
    ...query,
    idOffer: params.id,
  },
}, res);

export default {
  list,
  get,
  byOffers,
};
