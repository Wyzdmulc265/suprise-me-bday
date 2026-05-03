import { z } from 'zod';
import { wishes, letterQuotes } from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
};

export const api = {
  wishes: {
    random: {
      method: 'GET' as const,
      path: '/api/wishes/random' as const,
      responses: {
        200: z.custom<typeof wishes.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  quotes: {
    list: {
      method: 'GET' as const,
      path: '/api/quotes' as const,
      responses: {
        200: z.array(z.custom<typeof letterQuotes.$inferSelect>()),
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
