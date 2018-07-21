import selector from '../utils/selector';
import { OffersRel } from '../models';
import * as SelType from '../selectorTypes';
import paginationParse from '../utils/pagination';

const byOffers = async ({ query, params }, res) => {
  const {
    page,
    limit,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
  }, query);

  const args = selector({
    idOffer: SelType.id,
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
    idColumn: {
      ...SelType.numberType,
      default: 1,
    },
    direction: {
      ...SelType.numberType,
      default: 2,
    },
  }, {
    ...query,
    idOffer: params.id,
  });

  try {
    const data = await OffersRel.procedure({ args });
    const count = OffersRel.procedureCount();

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
  byOffers,
};
