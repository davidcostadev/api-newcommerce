import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send({
    apis: {
      v1: { },
    },
  });
});

const namespace = '/api/v1/';

// custom routers

export default router;
