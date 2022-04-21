import { useQuery } from 'react-query';
import { client } from '../../client';

export const getPeopleFromDynastyKey = (dynastyId: string) => [
  'getPeopleFromDynasty',
  dynastyId,
];
export const useGetPeopleFromDynasty = (dynastyId: string) => useQuery(getPeopleFromDynastyKey(dynastyId), () => client.personClient.personAll(dynastyId));
