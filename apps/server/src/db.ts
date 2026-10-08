import { Pool } from 'pg';
import Redis from 'ioredis';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost/indo-finity'
});

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379')
});

export { pool, redis };
