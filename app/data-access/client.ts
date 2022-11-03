import { Fetcher } from "openapi-typescript-fetch";
import { paths } from "~/dynastic-api.server";

export const baseUrl = process.env.BASE_URL;

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl,
});

export { fetcher };
