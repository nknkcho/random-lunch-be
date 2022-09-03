import db from 'mysql2';
import './env.js';

const connectDB = db.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default connectDB.promise();
