import Queue from 'bull';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

/**
 * Initialize Bull queue for background analytics processing.
 */
const analyticsQueue = new Queue('analyticsQueue', redisUrl);

analyticsQueue.on('error', (err) => {
  console.error('Analytics Queue Error:', err);
});

export default analyticsQueue;
