import { client } from "../../client";
import { useQuery } from "react-query";

export const getPeopleFromDynastyKey = (dynastyId: string) => [
  "getPeopleFromDynasty",
  dynastyId,
];
export const useGetPeopleFromDynasty = (dynastyId: string) =>
  useQuery(getPeopleFromDynastyKey(dynastyId), () =>
    client.personClient.personAll(dynastyId)
  );
