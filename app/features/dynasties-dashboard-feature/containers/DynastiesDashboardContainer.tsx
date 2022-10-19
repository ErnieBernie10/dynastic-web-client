import * as React from "react";
import { FunctionComponent } from "react";
import { Dynasty, Person } from "~/data-access/schemas";
import { Divider, Grid, Text, Title } from "@mantine/core";
import { CoaSvg } from "~/components/CoaSvg/CoaSvg";
import { getFullName } from "~/util/fn";

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
        <Divider />
        <Text weight={700}>{getFullName(userMember)}</Text>
        <Text>You</Text>
      </Grid.Col>
    </Grid>
  );
