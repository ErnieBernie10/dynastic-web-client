import * as React from "react";
import { FunctionComponent } from "react";
import { MainLayout } from "~/layouts/MainLayout";
import { CreateDynastyContainer } from "~/features/dynasty-create-feature";
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
import { getUserDynasties } from "~/data-access/dynasty/queries.server";
import { Dynasty, DynastyCreationStep } from "~/data-access/schemas";
import { first, isEmpty } from "lodash";
import { useLoaderData } from "@remix-run/react";
import {
  handleBasicInfoStep,
  handleCoaStep,
} from "~/services/create-dynasty.server";

interface CreateProps {}

export const action: ActionFunction = async ({ request }) => {
  const { accessToken } = await authorize(request);
  const formData = await request.formData();

  const queryParams = new URLSearchParams(request.url.split("?")[1]);

  const existingDynastyId = queryParams.get("id");

  switch (Number(formData.get("action")) as DynastyCreationStep) {
    case 0:
      await handleBasicInfoStep(formData, accessToken, existingDynastyId);
      break;
    case 1:
      await handleCoaStep(formData, accessToken, existingDynastyId);
      break;
    default:
      break;
  }

  return redirect("/dynasty/create", await withSessionFromRequest(request));
};

interface LoaderData {
  dynasty: Dynasty | undefined;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await authorize(request);
  const { data: dynasties } = await getUserDynasties(
    { isFinished: false },
    withToken(accessToken)
  );

  const hasUnfinishedDynasty = dynasties.some(
    (dynasty) => (dynasty.creationStep as number) < 3
  );

  if (!hasUnfinishedDynasty && !isEmpty(dynasties)) {
    return redirect("/dashboard", await withSessionFromRequest(request));
  }
  return json({ dynasty: first(dynasties) });
};

export const Create: FunctionComponent<CreateProps> = () => {
  const { dynasty } = useLoaderData<LoaderData>();
  return (
    <MainLayout>
      <CreateDynastyContainer dynasty={dynasty} />
    </MainLayout>
  );
};

export default Create;
