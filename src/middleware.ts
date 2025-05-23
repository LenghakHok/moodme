import { auth as betterAuth } from "@/core/lib/auth-server";
import { defineMiddleware, sequence } from "astro:middleware";

const ignored = ["/", "/api", "/svg"];

const auth = defineMiddleware(async (context, next) => {
  const session = await betterAuth.api.getSession({
    headers: context.request.headers,
  });
  // session will already asserted to not null since we have checked
  context.locals.session = session;

  if (
    ignored.some(
      (url) =>
        context.originPathname !== "/" &&
        context.originPathname.startsWith(url),
    )
  ) {
    return next();
  }

  if (!context.originPathname.startsWith("/auth") && session === null) {
    return context.redirect("/auth/sign-in");
  }

  if (context.originPathname.startsWith("/auth") && session !== null) {
    return context.redirect("/");
  }

  return next();
});

export const onRequest = sequence(auth);
