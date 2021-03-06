import 'babel-polyfill';

import './env';

import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import routes from './routes';
import logger from './utils/logger';
import * as errorHandler from './middlewares/errorHandler.middleware';

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test'
    ? process.env.TEST_APP_PORT
    : process.env.APP_PORT) || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', routes);

app.use(express.static(path.join(__dirname, '/../public')));

app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFoundError);

app.listen(app.get('port'), app.get('host'), () => {
  logger.log(
    'info',
    `Server started at http://${app.get('host')}:${app.get('port')}`
  );
});

export default app;
