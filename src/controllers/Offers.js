import selector from '../utils/selector';
import { Offers } from '../models';
import { EXCEPTION_NOT_FOUND, EXCEPTION_REQUEST_INVALID } from '../errors';
import paginationParse from '../utils/pagination';
import * as SelType from '../selectorTypes';

const list = async ({ query }, res) => {
  const {
    page,
    limit,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
  }, query);

  const where = selector({
    idProject: SelType.idProjectType,
    idFamily: SelType.id,
    idGroup: SelType.id,
    idSubGroup1: SelType.id,
    idSubGroup2: SelType.id,
    idSubGroup3: SelType.id,
    slug: SelType.slugSelType,
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
  const {
    id,
  } = selector({
    id: SelType.id,
  }, params);

  if (!id) {
    res.status(400).send(EXCEPTION_REQUEST_INVALID);
  }

  try {
    const entity = await Offers.findById(id);

    if (!entity) {
      res.status(404).send(EXCEPTION_NOT_FOUND);
    }

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
