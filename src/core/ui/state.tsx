// Root component
import { cn } from "@/core/lib/cn";
import type { ComponentPropsWithRef } from "react";

interface StateRootProps extends ComponentPropsWithRef<"section"> {}

export function State({ className, children, ...props }: StateRootProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

// Icon component
interface StateIconProps extends ComponentPropsWithRef<"div"> {}

export function StateIcon({ className, children, ...props }: StateIconProps) {
  return (
    <div
      className={cn("rounded-md border-2 border-dashed p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Title component

interface StateTitleProps extends ComponentPropsWithRef<"span"> {}

export function StateTitle({ className, children, ...props }: StateTitleProps) {
  return (
    <span
      className={cn(
        "w-full max-w-xs text-center font-bold uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Description component
import type { Muted } from "@/core/ui/typography";

interface StateDescriptionProps extends ComponentPropsWithRef<typeof Muted> {}

export function StateDescription({
  className,
  children,
  ...props
}: StateDescriptionProps) {
  return (
    <span
      className={cn(
        "w-full max-w-sm text-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// CTAs component
interface StateCTAsProps extends ComponentPropsWithRef<"div"> {}

export function StateActions({
  className,
  children,
  ...props
}: StateCTAsProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
