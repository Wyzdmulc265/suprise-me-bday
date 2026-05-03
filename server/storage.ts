import { wishes, letterQuotes, type Wish, type LetterQuote } from "@shared/schema";

export interface IStorage {
  getRandomWish(): Promise<Wish | undefined>;
  getLetterQuotes(): Promise<LetterQuote[]>;
}

const seedQuotes = [
  { id: 1, letter: "A", quote: "Awesome and amazing, that's you!" },
  { id: 2, letter: "B", quote: "Brilliant and beautiful!" },
  { id: 3, letter: "C", quote: "Charming and courageous!" },
  { id: 4, letter: "D", quote: "Dazzling and delightful!" },
  { id: 5, letter: "E", quote: "Extraordinary and energetic!" },
  { id: 6, letter: "F", quote: "Fabulous and fun!" },
  { id: 7, letter: "G", quote: "Generous and genuine!" },
  { id: 8, letter: "H", quote: "Happy and heartwarming!" },
  { id: 9, letter: "I", quote: "Incredible and inspiring!" },
  { id: 10, letter: "J", quote: "Joyful and just perfect!" },
  { id: 11, letter: "K", quote: "Kind and knowledgeable!" },
  { id: 12, letter: "L", quote: "Lovely and lively!" },
  { id: 13, letter: "M", quote: "Magnificent and marvelous!" },
  { id: 14, letter: "N", quote: "Noble and neat!" },
  { id: 15, letter: "O", quote: "Outstanding and optimistic!" },
  { id: 16, letter: "P", quote: "Phenomenal and precious!" },
  { id: 17, letter: "Q", quote: "Quirky and quick-witted!" },
  { id: 18, letter: "R", quote: "Radiant and remarkable!" },
  { id: 19, letter: "S", quote: "Spectacular and sweet!" },
  { id: 20, letter: "T", quote: "Terrific and talented!" },
  { id: 21, letter: "U", quote: "Unique and uplifting!" },
  { id: 22, letter: "V", quote: "Vibrant and victorious!" },
  { id: 23, letter: "W", quote: "Wonderful and wise!" },
  { id: 24, letter: "X", quote: "X-tra special in every way!" },
  { id: 25, letter: "Y", quote: "Youthful and yielding!" },
  { id: 26, letter: "Z", quote: "Zesty and zealous!" }
];

const seedWishes = [
  { id: 1, content: "Wishing you a day filled with happiness and a year filled with joy. Happy birthday!" },
  { id: 2, content: "May all your dreams come true and your life be filled with wonderful surprises. Happy birthday!" },
  { id: 3, content: "Sending you smiles for every moment of your special day…Have a wonderful time and a very happy birthday!" },
  { id: 4, content: "Hope your special day brings you all that your heart desires! Here's wishing you a day full of pleasant surprises! Happy birthday!" },
  { id: 5, content: "Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!" }
];

export class Storage implements IStorage {
  async getRandomWish(): Promise<Wish | undefined> {
    const index = Math.floor(Math.random() * seedWishes.length);
    return seedWishes[index];
  }

  async getLetterQuotes(): Promise<LetterQuote[]> {
    return seedQuotes;
  }
}

export const storage = new Storage();
