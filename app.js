import express from 'express';
import cors from 'cors';
import membersRouter from './routers/members.js';

const app = express();
const port = 3100;

app.use(express.json());
app.use(cors());
app.use('/members', membersRouter);
app.listen(port, () => {
  console.log('server is running..');
});
