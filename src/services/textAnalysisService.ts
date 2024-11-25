import Redis from "ioredis";
import RedisClient from "../config/radis";

class TextAnalysisService {
  private text: string;
  private redis: Redis;
  private CACHE_PREFIX = "text_analysis:";
  private CACHE_EXPIRATION = 3600; // 1 hour

  constructor(text: string, redisClient?: Redis) {
    this.text = text;
    this.redis = RedisClient.getInstance();
  }

  private getCacheKey(method: string, ...args: any[]): string {
    const argsKey = args.map((arg) => JSON.stringify(arg)).join(":");
    return `${this.CACHE_PREFIX}${method}:${this.hashCode(
      this.text
    )}:${argsKey}`;
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  async countWords(): Promise<number> {
    const cacheKey = this.getCacheKey("countWords");

    const cachedResult = await this.redis.get(cacheKey);
    if (cachedResult) return JSON.parse(cachedResult);

    const words = this.text.trim().replace(/\s+/g, " ").split(" ");
    const wordCount = words.filter((word) => word.length > 0).length;

    await this.redis.set(
      cacheKey,
      JSON.stringify(wordCount),
      "EX",
      this.CACHE_EXPIRATION
    );

    return wordCount;
  }

  async countCharacters(includeSpaces: boolean = true): Promise<number> {
    const cacheKey = this.getCacheKey("countCharacters", includeSpaces);

    const cachedResult = await this.redis.get(cacheKey);
    if (cachedResult) return JSON.parse(cachedResult);

    const characterCount = includeSpaces
      ? this.text.length
      : this.text.replace(/\s/g, "").length;

    await this.redis.set(
      cacheKey,
      JSON.stringify(characterCount),
      "EX",
      this.CACHE_EXPIRATION
    );

    return characterCount;
  }

  async findLongestWords(limit: number = 5): Promise<string> {
    const cacheKey = this.getCacheKey("findLongestWords", limit);

    const cachedResult = await this.redis.get(cacheKey);
    if (cachedResult) return JSON.parse(cachedResult);

    const words = this.text.match(/\b\w+\b/g);
    if (!words) return "";

    const longestWord = words.reduce((longest, currentWord) => {
      return currentWord.length > longest.length ? currentWord : longest;
    }, "");

    await this.redis.set(
      cacheKey,
      JSON.stringify(longestWord),
      "EX",
      this.CACHE_EXPIRATION
    );

    return longestWord;
  }

  countSentences(): number {
    const sentenceEndings = /[.!?]+/g;
    const sentences = this.text.split(sentenceEndings);

    return sentences.filter((sentence) => sentence.trim().length > 0).length;
  }

  countParagraphs(): number {
    const paragraphs = this.text.split(/\n\s*\n/);

    return paragraphs.filter((para) => para.trim().length > 0).length;
  }
}

export default TextAnalysisService;
