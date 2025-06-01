import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import connectionDB from './config/database/connection';
import router from './router';
import { errorHandler } from './utils/middlewares/';
import { NotFoundError } from './utils/errors/';
dotenv.config();

const app = express();
connectionDB();
app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router);

// 404 Handler
app.use((req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
