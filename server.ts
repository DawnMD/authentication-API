import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes';

const app = express();
dotenv.config({ path: __dirname + '/.env.local' });

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`server started at port ${process.env.PORT || 5000}`)
);
