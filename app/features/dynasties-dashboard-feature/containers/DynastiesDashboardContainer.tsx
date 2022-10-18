import * as React from "react";
import {FunctionComponent, useEffect} from "react";
import { Dynasty } from "~/data-access/schemas";
import {Divider, Grid, Image, Text, Title} from "@mantine/core";
import { first } from "lodash";
import { CoaSvg } from "~/components/CoaSvg/CoaSvg";
import {auth0} from "~/services/auth.server";

interface DynastiesDashboardContainerProps {
  dynasties: Dynasty[];
}

export const DynastiesDashboardContainer: FunctionComponent<
  DynastiesDashboardContainerProps
> = ({ dynasties }) => {
  // TODO: Also implement view for other dynasties. R1 will only cover a single dynasty per user.
  const primaryDynasty = first(dynasties);

  return (
    <Grid>
      <Grid.Col span={3}>
        <CoaSvg size="lg" src={primaryDynasty?.coaPath ?? undefined} />
      </Grid.Col>
      <Grid.Col span={9}>
        <Title order={1}>
          House of{" "}
          <Text weight={700} sx={{ display: "inline" }}>
            {primaryDynasty?.name}
          </Text>
        </Title>
        <Text weight={700} sx={{ display: "inline" }}>
          {primaryDynasty?.members?.length}
        </Text>
        <Text sx={{ display: "inline" }}> Members</Text>
        <Divider />
      </Grid.Col>
    </Grid>
  );
};
