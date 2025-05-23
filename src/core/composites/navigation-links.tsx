import { cn } from "@/core/lib/cn";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/core/ui/navigation-menu";
import { CoffeeIcon, HeartIcon, ZapIcon } from "lucide-react";
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
              "flex flex-row items-center gap-2 rounded-full px-4 py-1.5 hover:bg-pink-500/20",
            )}
            href="/"
          >
            <ZapIcon className="fill-pink-200 text-pink-500 dark:fill-pink-800 " />
            <span>Feed</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuLink
            className={cn(
              "flex flex-row items-center gap-2 rounded-full px-4 py-1.5 hover:bg-purple-500/20",
            )}
            href="/profile"
          >
            <HeartIcon className="fill-purple-200 text-purple-500 dark:fill-purple-800" />
            <span>Mood</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuLink
            className={cn(
              "flex flex-row items-center gap-2 rounded-full px-4 py-1.5 hover:bg-blue-500/20",
            )}
            href="/sponsor"
          >
            <CoffeeIcon className="fill-blue-200 text-blue-500 dark:fill-blue-800" />
            <span>Sponsor</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
