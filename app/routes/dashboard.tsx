import * as React from "react";
import { FunctionComponent } from "react";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import {
  authorize,
  withSessionFromRequest,
  withToken,
} from "~/services/auth.server";
import { useLoaderData } from "@remix-run/react";
import { getUserDynasties } from "~/data-access/dynasty/queries.server";
import { MainLayout } from "~/layouts/MainLayout";
import { Dynasty, Person } from "~/data-access/schemas";
import { first, isEmpty } from "lodash";
import { DynastiesDashboardContainer } from "~/features/dynasties-dashboard-feature";
import { NoDynastiesDashboardContainer } from "~/features/no-dynasties-dashboard-feature";

type LoaderData = {
  dynasties: Dynasty[];
  userMember: Person | undefined;
  primaryDynasty: Dynasty;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, userId } = await authorize(request);
  const { data: dynasties } = await getUserDynasties(
    { isFinished: false },
    withToken(accessToken)
  );

  // TODO: Make generated schema store value in some accessible constant
  const hasUnfinishedDynasty =
    !isEmpty(dynasties) &&
    dynasties.some((dynasty) => (dynasty.creationStep as number) < 1);

  if (hasUnfinishedDynasty) {
    return redirect("/dynasty/create", await withSessionFromRequest(request));
  }

  // TODO: Replace this with proper logic once we support multiple dynasties
  const primaryDynasty = first(dynasties) as Dynasty;

  const userMember = primaryDynasty.members?.find((m) => m.owner === userId);

  return json<LoaderData>({ dynasties, primaryDynasty, userMember });
};

const Dashboard: FunctionComponent = () => {
  const { dynasties, userMember, primaryDynasty } = useLoaderData<LoaderData>();

  return (
    <MainLayout>
      {!isEmpty(dynasties) ? (
        <DynastiesDashboardContainer
          primaryDynasty={primaryDynasty}
          userMember={userMember}
        />
      ) : (
        <NoDynastiesDashboardContainer />
      )}
    </MainLayout>
  );
};

export default Dashboard;
