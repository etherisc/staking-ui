import { createClient } from 'redis';

const url = process.env.REDIS_URL || 'redis://redis:6379';
export const redisClient = createClient({ url });
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

