import { useGetDynasties } from '@api/hooks';
import { DynastyCard } from '@features/list-dynasties/components/DynastyCard';
import * as React from 'react';
import { FunctionComponent } from 'react';

interface ListDynastiesContainerProps {}

export const ListDynastiesContainer: FunctionComponent<
  ListDynastiesContainerProps
> = () => {
  const { data } = useGetDynasties();
  return (
    <>
      {data?.map((dynasty) => (
        <DynastyCard dynasty={dynasty} key={dynasty.id} />
      ))}
    </>
  );
};
