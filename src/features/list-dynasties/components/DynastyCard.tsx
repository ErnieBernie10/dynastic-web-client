import { Dynasty } from '@api/ApiClient';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

type DynastyWithState<T> = T extends undefined | boolean ? Dynasty : Dynasty | undefined;

interface DynastyCardProps<T> extends BoxProps {
  dynasty?: DynastyWithState<T>;
  isLoading?: T;
}

export const DynastyCard = <T,>({
  dynasty,
  isLoading,
  ...rest
}: PropsWithChildren<DynastyCardProps<T>>) => {
  const { onOpen } = useDisclosure();

  return (
    <Flex
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      maxH="100%"
      w="md"
      overflow="hidden"
      justifyContent="space-between"
      flexDirection="column"
      p={5}
      {...rest}
    >
      <Box>
        <SkeletonCircle
          isLoaded={!isLoading}
          borderRadius="full"
          minH="250px"
          w="250px"
          m="0 auto"
          mb={4}
        >
          <Box borderWidth="1px" borderRadius="full" minH="250px" maxW="250px" m="0 auto">
            <Image
              boxSize="250px"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Wapen_van_West-Vlaanderen.svg/1487px-Wapen_van_West-Vlaanderen.svg.png"
              alt="Van Vlaanderen"
              objectFit="contain"
              borderRadius="full"
            />
          </Box>
        </SkeletonCircle>
        <Skeleton isLoaded={!isLoading} width="70%">
          <Heading size="lg" wordBreak="break-word" mr="10px" noOfLines={1}>
            {dynasty?.name}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} noOfLines={4} mt={4}>
          <Text>{dynasty?.description}</Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} width="50%">
          <Flex justify="flex-start" mt={4} mb={4}>
            <Text as="span" fontWeight="bold" fontSize="lg">
              Members:
            </Text>
            <Text as="p" fontSize="lg" ml={2}>
              {(dynasty?.members ?? []).length}
            </Text>
          </Flex>
        </Skeleton>
      </Box>
      <Box>
        <Button
          colorScheme="green"
          aria-label="Add member"
          rightIcon={<AddIcon />}
          float="right"
          onClick={onOpen}
        >
          Add Member
        </Button>
        <Button
          colorScheme="green"
          aria-label="View tree"
          as={Link}
          to={`/dynasty/${dynasty?.id}/tree`}
        >
          View Tree
        </Button>
      </Box>
    </Flex>
  );
};
