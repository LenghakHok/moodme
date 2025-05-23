import { Logo } from "@/core/components/logo";
import { cn } from "@/core/lib/cn";
import { Separator } from "@/core/ui/separator";
import type { ComponentPropsWithRef } from "react";

export function Navigation({
  className,
  children,
  ...props
}: ComponentPropsWithRef<"header">) {
  return (
    <header
      className={cn(
        "relative flex h-12 w-full max-w-2xl flex-row items-center justify-between gap-4 rounded-full bg-background px-2",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}

export function NavigationLogo({
  className,
  ...props
}: ComponentPropsWithRef<typeof Logo>) {
  return (
    <Logo
      className={cn("[&_svg:not([class*='size-'])]:size-8", className)}
      {...props}
    />
  );
}

export function NavigationActions({
  className,
  children,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex flex-row items-center justify-end gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function NavigationSeparator({
  className,
  ...props
}: ComponentPropsWithRef<typeof Separator>) {
  return (
    <Separator
      className={cn("data-[orientation=vertical]:h-4", className)}
      orientation="vertical"
      {...props}
    />
  );
}
