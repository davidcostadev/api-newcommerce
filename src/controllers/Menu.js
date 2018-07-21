import selector from '../utils/selector';
import { Menu } from '../models';
import * as SelType from '../selectorTypes';
import paginationParse from '../utils/pagination';

const list = async ({ query, params }, res) => {
  const {
    page,
    limit,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
  }, query);

  const args = selector({
    idMerchant: {
      ...SelType.numberType,
      default: 1,
    },
    idParent: {
      ...SelType.numberType,
      default: 0,
    },
    idLang: {
      ...SelType.numberType,
      default: 0,
    },
  }, query);

  try {
    const data = await Menu.procedure({ args });
    // const count = Menu.procedureCount();

    // const pagination = paginationParse(count, page, limit);

    res.json({
      data,
      // pagination,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export default {
  list,
};
