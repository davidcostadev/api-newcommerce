import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Rollbar from 'rollbar';
import expeditious from 'express-expeditious';
import redis from 'expeditious-engine-redis';
import routes from './routes';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'production') {
  const rollbar = Rollbar.init({
    accessToken: process.env.ROLLBAR_TOKEN,
    handleUncaughtExceptions: true,
    verbose: false,
  });

  app.use(rollbar.errorHandler());

  const cache = expeditious({
    namespace: 'expresscache',
    defaultTtl: '1 minute',
    engine: redis(),
  });

  app.use(cache);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  // intercepts OPTIONS method
  if (req.method === 'OPTIONS') {
    // respond with 200
    res.send(200);
  } else {
    // move on
    next();
  }
});

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server on: ${port}`);
});

export default app;
