import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata'; // Needed for TypeORM

dotenv.config(); // Load environment variables

import { AppDataSource } from './config/typeorm.config';
import userRoutes from './routes/user.routes';
import wikipediaRoutes from './routes/wikipedia.routes';
import searchHistoryRoutes from './routes/searchHistory.routes';
import cors from 'cors'; 

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

// User routes
app.use('/api/users', userRoutes);

// wikipedia
app.use('/api/wikipedia', wikipediaRoutes);

// Search History
app.use('/api/search-history', searchHistoryRoutes);

// Placeholder route
app.get('/api/', (req, res) => {
  res.send('API is Live');
});

export default app;
