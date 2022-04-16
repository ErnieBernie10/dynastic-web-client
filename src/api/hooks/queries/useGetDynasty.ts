import { client } from "../../client";
import { useQuery } from "react-query";

export const getDynastyKey = (id: string) => ["dynasty", id];
export const useGetDynasty = (id: string) =>
  useQuery(getDynastyKey(id), () => client.dynastyClient.dynastyGET(id));
