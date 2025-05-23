import { $fetch } from "@/core/lib/http-client";
import type { QueryClient } from "@tanstack/react-query";
import type { Mood } from "./types";

export function preloadMoodList(queryclient: QueryClient) {
  return queryclient.prefetchQuery({
    queryKey: ["mood", "list"],
    queryFn: async () => {
      const data = await $fetch<Mood[]>("/api/mood");
      return data;
    },
  });
}
