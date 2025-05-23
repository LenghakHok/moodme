import { FormAlert } from "@/core/composites/form-alert";
import { cn } from "@/core/lib/cn";
import { useCreateMood } from "@/core/services/moods/hooks";
import {
  MoodInsertFormSchema,
  type MoodInsertSchema,
} from "@/core/services/moods/pipes";
import { Button } from "@/core/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/ui/form";
import { Input } from "@/core/ui/input";
import { RadioGroup, RadioGroupItem } from "@/core/ui/radio-group";
import { Textarea } from "@/core/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/core/ui/tooltip";
import { For } from "@/core/utils/for";
import { emotions } from "@/domains/mood/constants/emotions";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { observable } from "@legendapp/state";
import { observer, useObservable } from "@legendapp/state/react";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, type ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";

interface MoodDialogStore {
  isOpen: boolean;
  meta: {
    emotion: (typeof emotions)[number] | undefined;
  };
}

const moodDialogStore$ = observable<MoodDialogStore>({
  isOpen: false,
  meta: {
    emotion: undefined,
  },
});

export function MoodEmotions({
  className,
  ...props
}: ComponentPropsWithRef<typeof Button>) {
  return (
    <For
      each={emotions}
      render={(emotion) => (
        <Tooltip key={emotion.icon.toString()}>
          <TooltipTrigger asChild={true}>
            <Button
              className={cn("size-fit rounded-full p-1", className)}
              onClick={() =>
                moodDialogStore$.set({
                  isOpen: true,
                  meta: {
                    emotion: emotion,
                  },
                })
              }
              size="icon"
              variant="ghost"
              {...props}
            >
              <span className="sr-only">{}</span>
              {<emotion.icon className="size-12" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="uppercase">{emotion.label}</TooltipContent>
        </Tooltip>
      )}
    />
  );
}

export const MoodCreateDialog = observer(
  (props: ComponentPropsWithRef<typeof Dialog>) => {
    const moodDialog = useObservable(moodDialogStore$);

    return (
      <Dialog
        onOpenChange={(v) => moodDialog.isOpen.set(v)}
        open={moodDialog.isOpen.get()}
        {...props}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Could you tell us why?</DialogTitle>
            <DialogDescription>
              Please add some more detail for us to understand about your day
            </DialogDescription>
          </DialogHeader>
          <MoodCreateForm />
        </DialogContent>
      </Dialog>
    );
  },
);

export function MoodCreateForm() {
  const moodDialog = useObservable(moodDialogStore$);

  const form = useForm<MoodInsertSchema>({
    resolver: valibotResolver(MoodInsertFormSchema),
    defaultValues: {
      date: new Date(),
      emoji: moodDialog.meta.emotion.get()?.label,
      isPublic: true,
      label: "",
      note: "",
    },
  });
  const { mutate, isSuccess, isPending } = useCreateMood(form);

  useEffect(() => {
    if (isSuccess) {
      moodDialogStore$.delete();
    }
  }, [isSuccess]);

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit((v) => mutate(v))}
      >
        <FormAlert message={form.formState.errors.root?.message} />

        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem className="flex w-full items-center justify-center">
              <FormControl>
                <RadioGroup
                  className="flex w-full flex-row items-center justify-between gap-6"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <For
                    each={emotions}
                    render={(emotion) => (
                      <FormItem
                        className="flex items-center"
                        key={emotion.icon.toString()}
                      >
                        <FormControl>
                          <RadioGroupItem
                            className="sr-only"
                            value={emotion.label}
                          />
                        </FormControl>
                        <FormLabel>
                          {
                            <emotion.icon
                              className={cn(
                                "size-12 transition-all",
                                emotion.label === field.value
                                  ? "scale-150 rounded-full border-2 border-dashed p-1"
                                  : "scale-100",
                              )}
                            />
                          }
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className="text-base">Label</FormLabel>
              <FormControl>
                <Input
                  className="h-12"
                  placeholder="What is your emotion today?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className="text-base">Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your preferences"
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
        >
          <LoaderCircleIcon
            className={cn(
              "animate-spin transition-all",
              isPending ? "size-4" : "absolute size-0",
            )}
          />
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  );
}
