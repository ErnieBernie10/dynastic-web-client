import * as React from "react";
import { forwardRef } from "react";
import { Avatar, Text, Group } from "@mantine/core";

interface PersonListItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  image?: string | undefined;
}

const PersonListItem = forwardRef<HTMLDivElement, PersonListItemProps>(
  ({ label, image, ...rest }, ref) => (
    <div ref={ref} {...rest}>
      <Group noWrap>
        <Avatar src={image} size="lg" />

        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

PersonListItem.displayName = "PersonListItem";

export { PersonListItem };
