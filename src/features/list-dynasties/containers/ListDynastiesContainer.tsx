import { useGetDynasties } from '@api/hooks';
import { Flex } from '@chakra-ui/react';
import { DynastyCard } from '@features/list-dynasties/components/DynastyCard';
import * as React from 'react';
import { FunctionComponent } from 'react';

interface ListDynastiesContainerProps {}

export const ListDynastiesContainer: FunctionComponent<
  ListDynastiesContainerProps
> = () => {
  const { data, isLoading } = useGetDynasties();
  return (
    <Flex flexWrap="wrap" justifyContent="center">
      {isLoading || !data
        ? Array(5)
            .fill(null)
            .map((_, index) => <DynastyCard key={index} m={4} isLoading={isLoading} />)
        : data.map((dynasty) => (
            <DynastyCard dynasty={dynasty} key={dynasty.id} m={4} isLoading={isLoading} />
          ))}
    </Flex>
  );
};
