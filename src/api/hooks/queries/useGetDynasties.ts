import { client } from "../../client";
import { useQuery } from "react-query";

export const getDynastiesKey = () => ["dynasties"];
export const useGetDynasties = () =>
  useQuery(getDynastiesKey(), () => client.dynastyClient.dynastyAll());
