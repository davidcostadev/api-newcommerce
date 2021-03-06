import paginationParse from '../utils/pagination';
import selector from '../utils/selector';
import * as SelType from '../selectorTypes';
import { EXCEPTION_NOT_FOUND, EXCEPTION_UNPROCESSABLE_ENTITY } from '../errors';
import { getModelAlias, listDefaultOptions, clearData } from '../utils/database/model';

const database = {};

const aliasDatabase = {
  AccountFrom: 'Accounts',
  AccountTo: 'Accounts',
};

const list = async ({ query }, Model, { options = listDefaultOptions }) => {
  const {
    filters,
    fields,
  } = options;
  let where = {};

  const {
    limit,
    page,
    batch,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
    batch: SelType.batchSelType,
    ...filters,
  }, query);

  const select = {
    limit,
    offset: parseInt(limit, 10) * (page - 1),
    order: [['id', 'DESC']],
  };

  if (filters) {
    where = selector(filters, query);
    select.where = where;
  }

  if (batch) {
    let models = batch.split(',');

    if (models.length) {
      models = models.map(getModelAlias(aliasDatabase, database));
      select.include = models;
    }
  }

  try {
    const data = await Model.findAll(select);
    const { count } = await Model.findAndCountAll({ where });
    const pagination = paginationParse(count, page, limit);

    return {
      data: clearData(data, fields),
      pagination,
    };
  } catch (e) {
    console.error(e);
    throw new Error(EXCEPTION_NOT_FOUND);
  }
};

const get = async (req, Model) => {
  const { id } = req.params;

  try {
    const entity = await Model.findById(id);

    if (!entity) {
      throw new Error(EXCEPTION_NOT_FOUND);
    }

    return entity;
  } catch (e) {
    throw new Error(EXCEPTION_NOT_FOUND);
  }
};

const create = async ({ body }, Model, { definitions }) => {
  const dataBody = selector(definitions, body);

  try {
    const entity = await Model.create(dataBody);

    return entity;
  } catch (e) {
    throw new Error(EXCEPTION_UNPROCESSABLE_ENTITY);
  }
};

const update = async ({ params, body }, Model, { definitions }) => {
  const { id } = params;

  const dataBody = selector(definitions, body);

  try {
    const entity = await Model.findById(id);

    if (!entity) {
      throw new Error(EXCEPTION_NOT_FOUND);
    }

    const updated = await entity.update(dataBody);

    return updated;
  } catch (e) {
    if (e.message === EXCEPTION_NOT_FOUND) {
      throw new Error(EXCEPTION_NOT_FOUND);
    }

    throw new Error(EXCEPTION_UNPROCESSABLE_ENTITY);
  }
};

const destroy = async (req, Model) => {
  const { id } = req.params;

  try {
    await Model.destroy({
      where: { id },
    });

    return true;
  } catch (e) {
    throw new Error(EXCEPTION_UNPROCESSABLE_ENTITY);
  }
};

export default {
  list,
  create,
  get,
  update,
  destroy,
};
