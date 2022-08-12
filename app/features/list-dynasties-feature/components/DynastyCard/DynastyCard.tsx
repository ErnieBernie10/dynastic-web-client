import { Card, createStyles, Group, Image, Text } from "@mantine/core";
import * as React from "react";
import { FunctionComponent } from "react";
import { Dynasty } from "~/data-access/schemas";

interface DynastyCardProps {
  dynasty: Dynasty;
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: 500,
    height: 200,
  },

  title: {
    fontWeight: 700,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export const DynastyCard: FunctionComponent<DynastyCardProps> = ({
  dynasty: {
    name,
    description,
    crestImage = "/images/placeholder/coat-of-arms.svg",
  },
}) => {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Card withBorder radius="md" p={8} m={8}>
          <Image width="100%" height={160} src={crestImage} fit="contain" />
        </Card>
        <div className={classes.body}>
          {/* <Text transform="uppercase" color="dimmed" weight={700} size="xs"> */}
          {/*  {category} */}
          {/* </Text> */}
          <Text className={classes.title} mt="xs" mb="md">
            {name}
          </Text>
          <Group noWrap spacing="xs">
            {/* <Group spacing="xs" noWrap> */}
            {/*  <Avatar size={20} src={author.avatar} /> */}
            {/*  <Text size="xs">{author.name}</Text> */}
            {/* </Group> */}
            <Text size="xs" color="dimmed">
              {description}
            </Text>
            {/* <Text size="xs" color="dimmed"> */}
            {/*  {date} */}
            {/* </Text> */}
          </Group>
        </div>
      </Group>
    </Card>
  );
};
