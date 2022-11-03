import * as React from "react";
import { forwardRef } from "react";
import { Avatar, Text, Group, ActionIcon, Box, Card } from "@mantine/core";
import { IconEdit } from "@tabler/icons";

interface PersonListItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  image?: string | undefined;
  // eslint-disable-next-line no-unused-vars
  onEditClick: () => void;
}

const PersonListItem = forwardRef<HTMLDivElement, PersonListItemProps>(
  ({ label, image, onEditClick, ...rest }, ref) => (
    <Card p={8} m={0} ref={ref} {...rest}>
      <Group noWrap>
        <Avatar src={image} size="lg" />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text size="sm" sx={{ display: "flex", alignItems: "center  " }}>
            {label}
          </Text>

          <ActionIcon onClick={onEditClick}>
            <IconEdit />
          </ActionIcon>
        </Box>
      </Group>
    </Card>
  )
);

PersonListItem.displayName = "PersonListItem";

export { PersonListItem };
