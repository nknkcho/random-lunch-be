import express from 'express';
import cors from 'cors';
import membersRouter from './routers/members.js';
import * as http from 'http';
import * as https from 'http2';
import fs from 'fs';
import './config/env.js';

const app = express();
const port = 3100;
const corsOptions = {
  origin: 'http://localhost:3000',
};
const production = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(cors(corsOptions));
app.use('/members', membersRouter);

if (production) {
  const options = {
    ca: fs.readFileSync('/etc/letsencrypt/live/backend.randomlunch.site/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/backend.randomlunch.site/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/backend.randomlunch.site/cert.pem'),
  };
  https.createServer(options, app).listen(port, () => {
    console.log('https is running..');
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log('port is running..');
  });
}
