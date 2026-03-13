import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { apiRouter, redirectRouter } from './routes/urlRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Connect to Redis (initializes connection via import)
import './config/redis.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
  res.send('URL Shortener API is running...');
});

// Main API routes for URL shortening
app.use('/api/url', apiRouter);

// Redirection route (should be at the root path usually for short URLs)
app.use('/', redirectRouter);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
