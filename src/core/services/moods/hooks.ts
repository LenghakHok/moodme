import { $fetch } from "@/core/lib/http-client";
import { $queryClient } from "@/core/lib/query-client";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { MoodInsertSchema, MooodSelect } from "./pipes";

export function useCreateMood(form?: UseFormReturn) {
  const queryClient = useStore($queryClient);
  return useMutation(
    {
      mutationKey: ["mood", "create"],
      mutationFn: async (args: MoodInsertSchema) =>
        await $fetch<MooodSelect>("/api/mood", {
          method: "POST",
          credentials: "include",
          body: args,
          throw: true,
          onError: (e) => {
            form?.setError("root", {
              message: e.error.message,
            });
          },
        }),
      onSuccess: () => {
        toast.success("Created");
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["mood"],
          exact: false,
        });

        queryClient.invalidateQueries({
          queryKey: ["mood"],
          exact: false,
        });
      },
    },
    queryClient,
  );
}
