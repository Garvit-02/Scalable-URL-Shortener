import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Create a Redis instance
const redis = new Redis(redisUrl);

redis.on('connect', () => {
  console.log('Redis Connected successfully.');
});

redis.on('error', (err) => {
  console.error('Redis Connection Error:', err);
});

export default redis;
