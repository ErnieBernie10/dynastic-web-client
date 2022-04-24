import { client } from '@api/client';
import { useQuery } from 'react-query';

export const getDynastiesKey = () => ['list-dynasties'];
export const useGetDynasties = () =>
  useQuery(getDynastiesKey(), () => client.dynastyClient.dynastyAll());
