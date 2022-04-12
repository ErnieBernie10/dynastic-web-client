import { useQuery } from "react-query";
import { dynastyClient } from "../..";

export const getDynastiesKey = () => "dynasties";
export const useGetDynasties = () => useQuery(getDynastiesKey(), () => dynastyClient.dynastyAll())