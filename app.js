import express from 'express';
import membersRouter from './routers/members.js';

const app = express();
const port = 3100;

app.use(express.json());
app.use('/members', membersRouter);
app.listen(port, () => {
  console.log('server is running..');
});
