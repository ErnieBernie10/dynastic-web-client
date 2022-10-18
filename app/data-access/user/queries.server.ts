import { fetcher } from "~/data-access/client";

export const getDynasticUserProfile = fetcher
  .path("/api/User")
  .method("get")
  .create();
