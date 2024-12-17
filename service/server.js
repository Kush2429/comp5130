import express from 'express';
import dotenv from 'dotenv';
import init from './app/app.js';

dotenv.config();

const app = express();
/**
 * The port number on which the server will listen.
 * @type {number}
 */
const PORT = process.env.PORT;
init(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
