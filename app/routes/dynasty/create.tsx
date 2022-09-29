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
import { createDynasty } from "~/data-access/dynasty/mutations.server";
import { z } from "zod";
import {Dynasty} from "~/data-access/schemas";
import {first, isEmpty} from "lodash";
import {useLoaderData} from "@remix-run/react";

interface CreateProps {}

const createDynastySchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().nullable(),
  motto: z.string().trim().nullable(),
});

export const action: ActionFunction = async ({ request }) => {
  const { accessToken } = await authorize(request);
  const formData = await request.formData();
  const name = formData.get("name");
  const motto = formData.get("motto");
  const description = formData.get("description");
  const formValues = {
    name: name as string,
    description: description as string,
    motto: motto as string,
  };

  const validated = createDynastySchema.safeParse(formValues);

  if (!validated.success) {
    return json(validated.error.format());
  }
  const response = await createDynasty(validated.data, withToken(accessToken));
  // TODO: Make more generic
  if (!response.ok) throw json({ errors: ["request failed"] });

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

  if (isEmpty(dynasties)) {
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
