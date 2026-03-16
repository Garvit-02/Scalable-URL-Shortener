import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { apiRouter, redirectRouter } from './routes/urlRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import { apiLimiter } from './middleware/rateLimiter.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Connect to Redis (initializes connection via import)
import './config/redis.js';

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. CORS Support
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// 3. Middleware to parse JSON
app.use(express.json());

// 4. Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// 5. Data Sanitization against XSS (Cross-Site Scripting)
app.use(xss());

// Base Route
app.get('/', (req, res) => {
  res.send('URL Shortener API is running...');
});

// 6. Main API routes for URL shortening (Apply rate limiter here)
app.use('/api/url', apiLimiter, apiRouter);

// 7. Redirection route (should be at the root path usually for short URLs)
app.use('/', redirectRouter);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
