import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const wishes = pgTable("wishes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
});

export const letterQuotes = pgTable("letter_quotes", {
  id: serial("id").primaryKey(),
  letter: text("letter").notNull(),
  quote: text("quote").notNull(),
});

export const insertWishSchema = createInsertSchema(wishes).pick({ content: true });
export const insertLetterQuoteSchema = createInsertSchema(letterQuotes).pick({ letter: true, quote: true });

export type InsertWish = z.infer<typeof insertWishSchema>;
export type Wish = typeof wishes.$inferSelect;

export type InsertLetterQuote = z.infer<typeof insertLetterQuoteSchema>;
export type LetterQuote = typeof letterQuotes.$inferSelect;
