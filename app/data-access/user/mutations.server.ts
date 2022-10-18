import { fetcher } from "~/data-access/client";

export const completeSignup = fetcher.path("/api/User").method("post").create();
