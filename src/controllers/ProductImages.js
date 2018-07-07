import { ProductImages } from '../models';
import paginationParse from '../utils/pagination';

const list = async ({ params }, res) => {
  const page = 1;
  const limit = 30;
  const where = {
    ID_PRODUTO: params.idProduct,
  };

  try {
    const data = await ProductImages.findAll({ where });
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
