import { cn } from "@/core/lib/cn";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/core/ui/navigation-menu";
import type { ComponentPropsWithRef } from "react";

export function NavigationLinks(
  props: ComponentPropsWithRef<typeof NavigationMenu>,
) {
  return (
    <NavigationMenu
      className="-translate-x-1/2 absolute left-1/2"
      {...props}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "uppercase tracking-wider",
            )}
            href="/"
          >
            Feed
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "uppercase tracking-wider",
            )}
            href="/profile"
          >
            Profile
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "uppercase tracking-wider",
            )}
            href="/sponsor"
          >
            Sponsor
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
