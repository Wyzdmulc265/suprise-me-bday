import { db } from "./db";
import { wishes, letterQuotes, type Wish, type LetterQuote } from "@shared/schema";
import { sql } from "drizzle-orm";

export interface IStorage {
  getRandomWish(): Promise<Wish | undefined>;
  getLetterQuotes(): Promise<LetterQuote[]>;
}

export class DatabaseStorage implements IStorage {
  async getRandomWish(): Promise<Wish | undefined> {
    const [wish] = await db.select().from(wishes).orderBy(sql`RANDOM()`).limit(1);
    return wish;
  }

  async getLetterQuotes(): Promise<LetterQuote[]> {
    return await db.select().from(letterQuotes);
  }
}

export const storage = new DatabaseStorage();
