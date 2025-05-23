import { ProfileDisplay } from "@/core/composites/profile-dropdown";
import type { Mood } from "@/core/services/moods/types";
import { Badge } from "@/core/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/ui/card";
import { Separator } from "@/core/ui/separator";
import { Muted, Small } from "@/core/ui/typography";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<typeof Card> {
  data: Mood;
}

export function MoodCard({ data, ...props }: Props) {
  return (
    <Card
      className="max-w-xs"
      {...props}
    >
      <CardHeader>
        <CardTitle className="sr-only">Mood Card</CardTitle>
        <ProfileDisplay user={data?.users} />
      </CardHeader>

      <Separator className="border border-dashed bg-transparent" />

      <CardContent className="grid w-full grid-cols-4 place-content-center gap-4">
        <>
          <Muted>Mood</Muted>
          <Small className="-col-end-1 col-start-2 [&_svg]:size-6">
            <Badge className="font-bold uppercase tracking-wide">
              {data?.moods?.emoji}
            </Badge>
          </Small>
        </>

        <>
          <Muted>Label</Muted>
          <Small className="col-start-2">{data?.moods?.label}</Small>
        </>
      </CardContent>
      <Separator className="border border-dashed bg-transparent" />
      <CardFooter>
        <Small className="col-span-full">{data?.moods?.note}</Small>
      </CardFooter>
    </Card>
  );
}
