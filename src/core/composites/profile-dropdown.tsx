// UI Components
import { UserAvatar } from "@/core/components/user-avatar";
import { buttonVariants } from "@/core/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/ui/dropdown-menu";
import { Muted } from "@/core/ui/typography";

// Icons
import { LogOutIcon, UserPlusIcon } from "lucide-react";

// Utils & Hooks
import { cn } from "@/core/lib/cn";
import { useCallback, type ComponentPropsWithRef } from "react";

// Services & State
import { authClient } from "@/core/lib/auth-client";

// Types
interface UserAvatarProps extends ComponentPropsWithRef<typeof UserAvatar> {}

// Component: ProfileDisplay - Shows user avatar and info
export function ProfileDisplay({
  className,
  user,
  ...props
}: ComponentPropsWithRef<"div"> & UserAvatarProps) {
  return (
    <div
      className={cn("flex items-center justify-start gap-4", className)}
      {...props}
    >
      <UserAvatar
        className="size-10"
        user={user}
      />

      <div className="flex w-fit flex-col items-start justify-center">
        <span className="font-bold">{user.name}</span>
        <Muted>{user.email}</Muted>
      </div>
    </div>
  );
}

// Main Component: ProfileDropdown
export function ProfileDropdown({ user, ...props }: UserAvatarProps) {
  const handleSignOut = useCallback(() => {
    authClient.signOut().then((_res) => {
      location.reload();
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-fit rounded-full",
        )}
      >
        <UserAvatar
          user={user}
          {...props}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="-mr-2 mt-4 min-w-xs"
      >
        {/* User Profile Section */}
        <DropdownMenuGroup className="p-1">
          <div className="justify-end-safe flex flex-col items-center gap-4 p-2">
            <ProfileDisplay
              className="w-full"
              user={user}
            />

            <div className="justify-end-safe flex w-full flex-row items-center gap-2">
              <DropdownMenuItem className="w-full justify-center border shadow-xs">
                <UserPlusIcon />
                <span>Add Account</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="w-full justify-center border shadow-xs"
                onClick={handleSignOut}
              >
                <LogOutIcon />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
