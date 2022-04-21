import { useQuery } from 'react-query';
import { client } from '../../client';

export const getDynastyKey = (id: string) => ['dynasty', id];
export const useGetDynasty = (id: string) => useQuery(getDynastyKey(id), () => client.dynastyClient.dynastyGET(id));
