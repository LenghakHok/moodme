import { HydrationBoundary } from "@/core/lib/query-client";
import { useGetMoodLists } from "@/core/services/moods/hooks";
import type { ComponentPropsWithoutRef } from "react";
import { MoodCard } from "../composites/mood-card";

export function MoodList(
  props: ComponentPropsWithoutRef<typeof HydrationBoundary>,
) {
  return (
    <HydrationBoundary {...props}>
      <MoodCards />
    </HydrationBoundary>
  );
}

function MoodCards() {
  const { data: res } = useGetMoodLists();

  return res?.map((data) => (
    <MoodCard
      data={data}
      key={data?.moods?.id}
    />
  ));
}
