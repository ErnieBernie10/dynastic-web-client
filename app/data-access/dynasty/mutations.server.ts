import { fetcher } from "~/data-access/client";

export const createDynasty = fetcher
  .path("/api/Dynasty")
  .method("post")
  .create();
