import { fetcher } from "~/data-access/client";

export const getUserDynasties = fetcher.path("/api/Dynasty").method("get").create();
