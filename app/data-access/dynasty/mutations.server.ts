import { fetcher } from "~/data-access/client";

export const createDynasty = fetcher
  .path("/api/Dynasty")
  .method("post")
  .create();

export const updateDynasty = fetcher
  .path("/api/Dynasty/{id}")
  .method("put")
  .create();
