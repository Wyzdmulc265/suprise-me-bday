import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

const seedQuotes = [
  { letter: "a", quote: "Awesome and amazing, that's you!" },
  { letter: "b", quote: "Brilliant and beautiful!" },
  { letter: "c", quote: "Charming and courageous!" },
  { letter: "d", quote: "Dazzling and delightful!" },
  { letter: "e", quote: "Extraordinary and energetic!" },
  { letter: "f", quote: "Fabulous and fun!" },
  { letter: "g", quote: "Generous and genuine!" },
  { letter: "h", quote: "Happy and heartwarming!" },
  { letter: "i", quote: "Incredible and inspiring!" },
  { letter: "j", quote: "Joyful and just perfect!" },
  { letter: "k", quote: "Kind and knowledgeable!" },
  { letter: "l", quote: "Lovely and lively!" },
  { letter: "m", quote: "Magnificent and marvelous!" },
  { letter: "n", quote: "Noble and neat!" },
  { letter: "o", quote: "Outstanding and optimistic!" },
  { letter: "p", quote: "Phenomenal and precious!" },
  { letter: "q", quote: "Quirky and quick-witted!" },
  { letter: "r", quote: "Radiant and remarkable!" },
  { letter: "s", quote: "Spectacular and sweet!" },
  { letter: "t", quote: "Terrific and talented!" },
  { letter: "u", quote: "Unique and uplifting!" },
  { letter: "v", quote: "Vibrant and victorious!" },
  { letter: "w", quote: "Wonderful and wise!" },
  { letter: "x", quote: "X-tra special in every way!" },
  { letter: "y", quote: "Youthful and yielding!" },
  { letter: "z", quote: "Zesty and zealous!" },
];

const seedWishes = [
  { content: "Wishing you a day filled with happiness and a year filled with joy. Happy birthday!" },
  { content: "May all your dreams come true and your life be filled with wonderful surprises. Happy birthday!" },
  { content: "Sending you smiles for every moment of your special day…Have a wonderful time and a very happy birthday!" },
  { content: "Hope your special day brings you all that your heart desires! Here's wishing you a day full of pleasant surprises! Happy birthday!" },
  { content: "Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!" },
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Skip DB seed for local dev (using mock storage)

  app.get(api.wishes.random.path, async (req, res) => {
    const wish = await storage.getRandomWish();
    if (!wish) {
      return res.status(404).json({ message: "No wishes found" });
    }
    res.json(wish);
  });

  app.get(api.quotes.list.path, async (req, res) => {
    const quotes = await storage.getLetterQuotes();
    res.json(quotes);
  });

  return httpServer;
}
