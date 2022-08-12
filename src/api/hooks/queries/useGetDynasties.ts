import { client } from '@api/client';
import { sleep } from '@common/util/sleep/sleep';
import { useQuery } from 'react-query';

export const getDynastiesKey = () => ['list-dynasties'];
export const useGetDynasties = () =>
  useQuery(getDynastiesKey(), () => sleep(client.dynastyClient.dynastyAll(), 1000));
