import * as React from "react";
import { FunctionComponent } from "react";
import { Dynasty, Person } from "~/data-access/schemas";
import {
  Box,
  Button,
  Divider,
  Grid,
  Popover,
  Text,
  Title,
} from "@mantine/core";
import { CoaSvg } from "~/components/CoaSvg/CoaSvg";
import { getFullName } from "~/util/fn";
import { IconUserPlus, IconUserSearch } from "@tabler/icons";
import { InfoButton } from "@ui/common";

interface DynastiesDashboardContainerProps {
  userMember: Person | undefined;
  primaryDynasty: Dynasty;
}

export const DynastiesDashboardContainer: FunctionComponent<
  DynastiesDashboardContainerProps
> = ({ userMember, primaryDynasty }) => (
  <Grid>
    <Grid.Col span={3}>
      <CoaSvg size="lg" src={primaryDynasty?.coaPath ?? undefined} />
    </Grid.Col>
    <Grid.Col span={9}>
      <Grid>
        <Grid.Col span={8}>
          <Title order={1}>
            House of{" "}
            <Text weight={700} component="span" sx={{ display: "inline" }}>
              {primaryDynasty?.name}
            </Text>
          </Title>
          <Text weight={700} component="span" sx={{ display: "inline" }}>
            {primaryDynasty?.members?.length}
          </Text>
          <Text sx={{ display: "inline" }}> Members</Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button leftIcon={<IconUserPlus />}>Add</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Button.Group
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    height: 80,
                  }}
                >
                  <InfoButton
                    width="150px"
                    leftIcon={<IconUserPlus />}
                    label="Add member"
                    description="Add a member without an account"
                  />
                  <InfoButton
                    width="150px"
                    leftIcon={<IconUserSearch />}
                    label="Invite"
                    description="Invite a user to join this dynasty"
                    variant="default"
                  >
                    Invite
                  </InfoButton>
                </Button.Group>
              </Popover.Dropdown>
            </Popover>
          </Box>
        </Grid.Col>
      </Grid>
      <Divider />
      <Text weight={700}>{getFullName(userMember)}</Text>
      <Text>You</Text>
    </Grid.Col>
  </Grid>
);
