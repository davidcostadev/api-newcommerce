import selector from '../utils/selector';
import { OfferContent } from '../models';
import paginationParse from '../utils/pagination';
import * as SelType from '../selectorTypes';
import { EXCEPTION_REQUEST_INVALID } from '../errors';

const list = async ({ query, params }, res) => {
  const {
    page,
    limit,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
  }, query);

  const where = selector({
    idOffer: SelType.idProjectType,
  }, {
    idOffer: params.id,
  });

  if (typeof where.idOffer === 'undefined') {
    res.status(400).send(EXCEPTION_REQUEST_INVALID);
  }

  try {
    const data = await OfferContent.findAll({ where, limit, page });
    const count = await OfferContent.findAndCountAll({ where });
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
