import selector from '../utils/selector';
import { Search } from '../models';
import { createArgsWord, reMount } from '../utils/searchQuery';
import * as SelType from '../selectorTypes';
import paginationParse from '../utils/pagination';
import { EXCEPTION_REQUEST_INVALID } from '../errors';

const list = async ({ query }, res) => {
  const {
    page,
    limit,
    q,
  } = selector({
    limit: SelType.limitSelType,
    page: SelType.pageSelType,
    q: {
      ...SelType.stringType,
      default: '',
    },
  }, query);

  const args = selector({
    idProject: SelType.id,
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
  });

  if (!args.idProject || !q) {
    res.status(400).send(EXCEPTION_REQUEST_INVALID);
  }

  const newArgs = {
    ...args,
    ...createArgsWord(reMount(q)),
  };

  try {
    const data = await Search.procedure({ args: newArgs });
    const count = Search.procedureCount();

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
