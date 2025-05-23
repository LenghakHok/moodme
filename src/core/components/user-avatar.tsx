import type { authClient } from "@/core/lib/auth-client";
import { cn } from "@/core/lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof Avatar> {
  user: Partial<typeof authClient.$Infer.Session.user>;
}

export function UserAvatar({ user, className, ...props }: Props) {
  return (
    <Avatar
      className={cn("size-10", className)}
      {...props}
    >
      <AvatarImage
        alt="profile"
        src={user.image ?? ""}
      />
      <AvatarFallback className="border uppercase">
        {user?.name?.[0]}
      </AvatarFallback>
    </Avatar>
  );
}
