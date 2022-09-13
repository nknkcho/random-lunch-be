import express from 'express';
import cors from 'cors';
import membersRouter from './routers/members.js';

const app = express();
const port = 3100;
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/members', membersRouter);
app.listen(port, () => {
  console.log('server is running..');
});
