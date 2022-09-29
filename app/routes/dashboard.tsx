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
import { Dynasty } from "~/data-access/schemas";
import { isEmpty } from "lodash";
import { DynastiesDashboardContainer } from "~/features/dynasties-dashboard-feature";
import { NoDynastiesDashboardContainer } from "~/features/no-dynasties-dashboard-feature";

type LoaderData = {
  dynasties: Dynasty[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await authorize(request);
  const { data: dynasties } = await getUserDynasties(
    {},
    withToken(accessToken)
  );

  // Step 3 is Finalized step.
  // TODO: Make generated schema store value in some accessible constant
  const hasUnfinishedDynasty = !dynasties.some(
    (dynasty) => (dynasty.creationStep as number) < 3
  );

  if (hasUnfinishedDynasty) {
    return redirect("/dynasty/create", await withSessionFromRequest(request));
  }
  return json<LoaderData>({ dynasties });
};

const Dashboard: FunctionComponent = () => {
  const { dynasties } = useLoaderData<LoaderData>();

  return (
    <MainLayout>
      {!isEmpty(dynasties.length) ? (
        <DynastiesDashboardContainer />
      ) : (
        <NoDynastiesDashboardContainer />
      )}
    </MainLayout>
  );
};

export default Dashboard;
