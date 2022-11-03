import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Dynasty, Person } from "~/data-access/schemas";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  Paper,
  Popover,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { CoaSvg } from "~/components/CoaSvg/CoaSvg";
import { getFullName } from "~/util/fn";
import { IconUserPlus, IconUserSearch } from "@tabler/icons";
import { InfoButton } from "@ui/common";
import { useDisclosure } from "@mantine/hooks";
import { ModifyMemberDrawer } from "~/features/add-member-feature";
import { useDrawer } from "~/util/hooks";
import { useLoading } from "~/util/hooks/useLoading";
import { useTransitionEvent } from "~/util/hooks/useTransitionEvent";
import { PersonListItem } from "~/components/PersonListItem";

interface DynastiesDashboardContainerProps {
  userMember: Person | undefined;
  primaryDynasty: Dynasty;
}

export const DynastiesDashboardContainer: FunctionComponent<
  DynastiesDashboardContainerProps
> = ({ userMember, primaryDynasty }) => {
  const [
    isAddPopoverOpen,
    { close: closeAddPopover, toggle: toggleAddPopover },
  ] = useDisclosure(false);

  const { show, isOpen, close } = useDrawer();
  const [editingMember, setEditingMember] = useState<Person | null>(null);

  const loadingAddMember = useLoading();
  useTransitionEvent({
    onActionRedirect: () => close(),
  });

  return (
    <>
      <Drawer
        opened={isOpen}
        onClose={() => {
          setEditingMember(null);
          close();
        }}
        size="xl"
      >
        <ModifyMemberDrawer
          isLoading={loadingAddMember}
          dynasty={primaryDynasty}
          member={editingMember}
        />
      </Drawer>
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
                <Popover
                  position="bottom"
                  shadow="md"
                  opened={isAddPopoverOpen}
                  styles={{
                    dropdown: {
                      padding: "0",
                      border: "0",
                    },
                  }}
                >
                  <Popover.Target>
                    <Button
                      leftIcon={<IconUserPlus />}
                      onClick={toggleAddPopover}
                    >
                      Add
                    </Button>
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
                        onClick={() => {
                          closeAddPopover();
                          show();
                        }}
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
          <Grid>
            <Grid.Col span={8}>
              <Text weight={700}>{getFullName(userMember)}</Text>
              <Text>You</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <Paper p="8px" mt={8} withBorder>
                <List
                  listStyleType="none"
                  spacing={8}
                  styles={{
                    itemWrapper: {
                      display: "block",
                    },
                  }}
                >
                  <ScrollArea sx={{ height: 300 }}>
                    {primaryDynasty.members?.map((member) => (
                      <List.Item key={member.id}>
                        <PersonListItem
                          label={getFullName(member)}
                          onEditClick={() => {
                            setEditingMember(member);
                            show();
                          }}
                        />
                      </List.Item>
                    ))}
                  </ScrollArea>
                </List>
              </Paper>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
};
