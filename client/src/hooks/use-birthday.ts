import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useQuotes() {
  return useQuery({
    queryKey: [api.quotes.list.path],
    queryFn: async () => {
      const res = await fetch(api.quotes.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch quotes");
      return api.quotes.list.responses[200].parse(await res.json());
    },
    // Keep data fresh, retry a couple times if backend is slow
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRandomWish(enabled: boolean) {
  return useQuery({
    queryKey: [api.wishes.random.path],
    queryFn: async () => {
      const res = await fetch(api.wishes.random.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch random wish");
      return api.wishes.random.responses[200].parse(await res.json());
    },
    enabled,
    retry: 2,
  });
}

// Helper hook to map quotes by letter for instant O(1) lookup during the animation
export function useQuoteMap() {
  const { data: quotes, isLoading } = useQuotes();
  
  const quoteMap = new Map<string, string>();
  if (quotes) {
    quotes.forEach((q) => {
      quoteMap.set(q.letter.toUpperCase(), q.quote);
    });
  }
  
  return { quoteMap, isLoading };
}
