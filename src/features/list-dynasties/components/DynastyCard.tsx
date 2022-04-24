import { Dynasty } from '@api/ApiClient';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Image, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

interface DynastyCardProps {
  dynasty: Dynasty;
}

export const DynastyCard: React.FC<DynastyCardProps> = ({ dynasty }) => {
  const { onOpen } = useDisclosure();

  return (
    <div>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        maxH="100%"
        overflow="hidden"
        p={5}
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
        <Heading size="lg" wordBreak="break-word" mr="10px">
          {dynasty.name}
        </Heading>
        <Flex justify="space-between" mt={5}>
          <Text as="span" fontWeight="bold" fontSize="lg">
            Members:
          </Text>
          <Text as="p" fontSize="lg">
            {dynasty.members?.length}
          </Text>
        </Flex>
        <Button
          size="sm"
          colorScheme="green"
          aria-label="Add member"
          rightIcon={<AddIcon />}
          float="right"
          onClick={onOpen}
        >
          Add Member
        </Button>
        <Button
          size="sm"
          colorScheme="green"
          aria-label="View tree"
          as={Link}
          to={`/dynasty/${dynasty.id}/tree`}
        >
          View Tree
        </Button>
      </Box>
    </div>
  );
};
