import { useQuery } from 'react-query';

import { client } from '../../client';

export const getDynastiesKey = () => ['dynasties'];
export const useGetDynasties = () =>
  useQuery(getDynastiesKey(), () => client.dynastyClient.dynastyAll());
