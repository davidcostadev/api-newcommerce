import selector from '../utils/selector';
import { Users } from '../models';
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
    const data = await Users.findAll({ where, limit, page });
    const { count } = await Users.findAndCountAll({ where });
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

export default {
  list,
};
