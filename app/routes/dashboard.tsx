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
import { getDynasties } from "~/data-access/dynasty/queries.server";
import { createDynasty } from "~/data-access/dynasty/mutations.server";
import { MainLayout } from "~/layouts/MainLayout";
import { Dynasty } from "~/data-access/schemas";
import { z } from "zod";
import { isEmpty } from "lodash";
import { DynastiesDashboardContainer } from "~/features/dynasties-dashboard-feature";
import { NoDynastiesDashboardContainer } from "~/features/no-dynasties-dashboard-feature";

type LoaderData = {
  dynasties: Dynasty[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await authorize(request);
  const { data: dynasties } = await getDynasties({}, withToken(accessToken));
  return json<LoaderData>({ dynasties });
};

const createDynastySchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().nullable(),
});

export const action: ActionFunction = async ({ request }) => {
  const { accessToken } = await authorize(request);
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const formValues = {
    name: name as string,
    description: description as string,
  };

  const validated = createDynastySchema.safeParse(formValues);

  if (!validated.success) {
    return json(validated.error.format());
  }
  const response = await createDynasty(validated.data, withToken(accessToken));
  // TODO: Make more generic
  if (!response.ok) throw json({ errors: ["request failed"] });

  return redirect("/dashboard", await withSessionFromRequest(request));
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
