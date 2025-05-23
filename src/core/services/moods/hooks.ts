import { $fetch } from "@/core/lib/http-client";
import { $queryClient } from "@/core/lib/query-client";
import { useStore } from "@nanostores/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type {
  MoodIdParamsRequest,
  MoodInsertSchema,
  MoodUpdateSchema,
  MooodSelect,
} from "./pipes";
import type { Mood } from "./types";

export function useCreateMood<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(form?: UseFormReturn<TFieldValues, TContext, TTransformedValues>) {
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

export function useUpdateMood<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(form?: UseFormReturn<TFieldValues, TContext, TTransformedValues>) {
  const queryClient = useStore($queryClient);
  return useMutation(
    {
      mutationKey: ["mood", "update"],
      mutationFn: async ({ id, ...args }: MoodUpdateSchema) =>
        await $fetch<MooodSelect>(`/api/mood/${id}`, {
          method: "PATCH",
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
        toast.success("Updated");
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

export function useDeleteMood<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(form?: UseFormReturn<TFieldValues, TContext, TTransformedValues>) {
  const queryClient = useStore($queryClient);
  return useMutation(
    {
      mutationKey: ["mood", "delete"],
      mutationFn: async ({ id }: MoodIdParamsRequest) =>
        await $fetch<MooodSelect>(`/api/mood/${id}`, {
          method: "DELETE",
          credentials: "include",

          throw: true,
          onError: (e) => {
            form?.setError("root", {
              message: e.error.message,
            });
          },
        }),
      onSuccess: () => {
        toast.success("Updated");
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

export function useGetMoodLists() {
  const queryClient = useStore($queryClient);

  return useQuery(
    {
      queryKey: ["mood", "list"],
      queryFn: async () => $fetch<Mood[]>("/api/mood"),
    },
    queryClient,
  );
}

export function useGetMyMoodLists() {
  const queryClient = useStore($queryClient);

  return useQuery(
    {
      queryKey: ["mood", "list"],
      queryFn: async () => $fetch<Mood[]>("/api/mood/me"),
    },
    queryClient,
  );
}
