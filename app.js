import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from './models/index.js';

dotenv.config()

connect().then(() => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: 'http://localhost:8080',
    })
  );

  app.get('/', (req, res) => {
    res.send('API em execucao');
  });

  app.listen(process.env.PORT || 8081, () => {});
})
