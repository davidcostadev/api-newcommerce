import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Rollbar from 'rollbar';
import routes from './routes';

dotenv.config();

const app = express();

const rollbar = Rollbar.init({
  accessToken: process.env.ROLLBAR_TOKEN,
  handleUncaughtExceptions: true,
  verbose: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(rollbar.errorHandler());

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
