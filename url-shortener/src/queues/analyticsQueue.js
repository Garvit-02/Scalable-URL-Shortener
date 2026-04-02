import Queue from 'bull';
import dotenv from 'dotenv';

dotenv.config();

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT || 6379;
let redisUrl = process.env.REDIS_URL;

if (redisHost && (!redisUrl || redisUrl.includes('localhost') || redisUrl.includes('127.0.0.1'))) {
  redisUrl = `redis://${redisHost}:${redisPort}`;
} else if (!redisUrl) {
  redisUrl = 'redis://localhost:6379';
}


/**
 * Initialize Bull queue for background analytics processing.
 */
const analyticsQueue = new Queue('analyticsQueue', redisUrl);

analyticsQueue.on('error', (err) => {
  console.error('Analytics Queue Error:', err);
});

export default analyticsQueue;
