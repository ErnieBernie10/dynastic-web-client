import { Fetcher } from "openapi-typescript-fetch";
import {paths} from "~/dynastic-api.server";

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl: "https://localhost:7256"
});

export { fetcher };
