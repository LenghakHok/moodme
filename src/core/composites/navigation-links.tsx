import { cn } from "@/core/lib/cn";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
            className={cn("px-4 py-1.5")}
            href="/"
          >
            Feed
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuLink
            className={cn("px-4 py-1.5")}
            href="/profile"
          >
            Profile
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuLink
            className={cn("px-4 py-1.5")}
            href="/sponsor"
          >
            Sponsor
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
