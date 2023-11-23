import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import autocollectRoutes from './routes/autocollectRoutes.js';
import beneficiaireRoutes from './routes/beneficiaireRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import productRoutes from './routes/productRoutes.js';
import reclamationRoutes from './routes/reclamationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const port = process.env.PORT || 5005;
const databaseName = 'pdm';
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`${dbUrl}/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB: ${databaseName}`);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));

// Routes
app.use('/autocollect', autocollectRoutes);
app.use('/beneficiaire', beneficiaireRoutes);
app.use('/donation', donationRoutes);
app.use('/product', productRoutes);
app.use('/reclamation', reclamationRoutes);
app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/order', orderRoutes);
// Error handling middleware
app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
