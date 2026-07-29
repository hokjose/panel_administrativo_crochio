import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {

  const response = await next();

  response.headers.set(
    "Content-Type",
    "text/html; charset=UTF-8"
  );

  return response;
});