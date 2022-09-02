import express from 'express';
import membersRouter from './routers/members.js';

const app = express();
const port = 3100;

app.use('/members', membersRouter);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server is running..');
});
