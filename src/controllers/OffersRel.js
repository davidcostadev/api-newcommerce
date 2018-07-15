import { OffersRel } from '../models';

const list = async (req, res) => {
  try {
    const data = await OffersRel.procedure();

    console.log(data);

    res.json({
      data,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export default {
  list,
};
