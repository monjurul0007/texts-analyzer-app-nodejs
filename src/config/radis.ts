import Redis from "ioredis";

class RedisClient {
  private static instance: Redis;

  private constructor() {}

  static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        db: Number(process.env.REDIS_DB) || 0,
      });

      this.instance.on("error", (err) => {
        console.error("Redis Client Error", err);
      });
    }

    return this.instance;
  }
}

export default RedisClient;
