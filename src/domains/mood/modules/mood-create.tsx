import { cn } from "@/core/lib/cn";
import { Button } from "@/core/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/core/ui/tooltip";
import { For } from "@/core/utils/for";
import type { ComponentPropsWithRef } from "react";
import { emotions } from "../constants/emotions";

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
