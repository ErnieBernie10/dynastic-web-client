import { fetcher } from "~/data-access/client";

export const getDynasties = fetcher.path("/api/Dynasty").method("get").create();
