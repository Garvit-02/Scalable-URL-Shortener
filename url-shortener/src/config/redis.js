import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;
const redisUrl = process.env.REDIS_URL || `redis://${redisHost}:${redisPort}`;

// Create a Redis instance
const redis = new Redis(redisUrl);

redis.on('connect', () => {
  console.log('Redis Connected successfully.');
});

redis.on('error', (err) => {
  console.error('Redis Connection Error:', err);
});

export default redis;
