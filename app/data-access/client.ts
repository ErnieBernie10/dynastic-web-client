import { Fetcher } from "openapi-typescript-fetch";
import { paths } from "~/dynastic-api.server";

export const baseUrl = "https://localhost:7256";

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl,
});

export { fetcher };
