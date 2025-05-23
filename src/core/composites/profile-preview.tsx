import type { ComponentPropsWithRef } from "react";
import { UserAvatar } from "../components/user-avatar";
import type { authClient } from "../lib/auth-client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Muted } from "../ui/typography";

interface Props extends ComponentPropsWithRef<typeof HoverCard> {
  user: Partial<typeof authClient.$Infer.Session.user>;
}

export function ProfilePreview({ user, ...props }: Props) {
  return (
    <HoverCard {...props}>
      <HoverCardTrigger>
        <UserAvatar
          className="size-10"
          user={user}
        />
      </HoverCardTrigger>
      <HoverCardContent className="flex w-fit flex-row items-center justify-center gap-4">
        <UserAvatar user={user} />
        <div className="flex flex-col items-start justify-center">
          <strong>{user.name}</strong>
          <Muted>{user.email}</Muted>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
