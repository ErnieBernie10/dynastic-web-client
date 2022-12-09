import * as React from "react";
import { FunctionComponent } from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
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
import {
  handleCreateMember,
  handleUpdateMember,
} from "~/services/create-member.server";
import { handleInviteMember } from "~/services/invite-member.server";

type LoaderData = {
  dynasties: Dynasty[];
  userMember: Person | undefined;
  primaryDynasty: Dynasty | undefined;
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
  const primaryDynasty = first(dynasties);

  const userMember = primaryDynasty?.members?.find((m) => m.owner === userId);

  return json<LoaderData>({ dynasties, primaryDynasty, userMember });
};

export const action: ActionFunction = async ({ request }) => {
  const { accessToken } = await authorize(request);
  const url = new URL(request.url);
  const formData = await request.formData();

  const personId = url.searchParams.get("personId");

  switch (formData.get("action")) {
    case "add-member":
      return personId
        ? handleUpdateMember(request, accessToken, formData)
        : handleCreateMember(request, accessToken, formData);
    case "invite-member":
      return handleInviteMember(request, accessToken, formData);
    default:
      throw json("Invalid action");
  }
};

const Dashboard: FunctionComponent = () => {
  const { dynasties, userMember, primaryDynasty } = useLoaderData<LoaderData>();

  return (
    <MainLayout>
      {!isEmpty(dynasties) && primaryDynasty ? (
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
