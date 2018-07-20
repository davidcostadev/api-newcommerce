import selector from '../utils/selector';
import { ProductImages } from '../models/firebird';
import paginationParse from '../utils/pagination';
import * as SelType from '../selectorTypes';

const list = async ({ params, query }, res) => {
  const {
    page,
    limit,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
  }, query);

  const where = selector({
    idProduct: SelType.id,
  }, {
    idProduct: params.id,
  });

  try {
    const data = await ProductImages.findAll({ where, limit, page });
    const count = await ProductImages.findAndCountAll({ where });
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
