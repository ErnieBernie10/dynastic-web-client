import { Fetcher } from "openapi-typescript-fetch";
import { paths } from "~/dynastic-api.server";

export const baseUrl = process.env.BASE_URL;

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl,
  use: [
    async (url, init, next) => {
      try {
        return await next(url, init);
      } catch (e) {
        // @ts-ignore
        throw new Error(JSON.stringify(e.data));
      }
    },
  ],
});

export { fetcher };
