import * as React from "react";
import { FunctionComponent } from "react";
import { MainLayout } from "~/layouts/MainLayout";
import { CompleteSignupContainer } from "~/features/complete-signup-feature";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { z } from "zod";
import {
  authorize,
  withSessionFromRequest,
  withToken,
} from "~/services/auth.server";
import { completeSignup } from "~/data-access/user/mutations.server";

export const CompleteSignupFormFields = {
  firstname: "firstname",
  lastname: "lastname",
  middlename: "middlename",
  birthDate: "birthDate",
} as const;

const completeSignupSchema = z.object({
  [CompleteSignupFormFields.firstname]: z.string().trim().min(1),
  [CompleteSignupFormFields.lastname]: z.string().trim().min(1),
  [CompleteSignupFormFields.middlename]: z.string().trim().nullable(),
  [CompleteSignupFormFields.birthDate]: z
    .string()
    .transform((dateString) => {
      // TODO: Make generic
      try {
        return new Date(dateString).toISOString();
      } catch {
        return "";
      }
    })
    .refine((val) => val.length > 0, {
      message: "Birth date cannot be empty",
    }),
});

export const action: ActionFunction = async ({ request }) => {
  const { accessToken } = await authorize(request);
  const formData = await request.formData();

  const fields = {
    firstname: formData.get(CompleteSignupFormFields.firstname),
    lastname: formData.get(CompleteSignupFormFields.lastname),
    middlename: formData.get(CompleteSignupFormFields.middlename),
    birthDate: formData.get(CompleteSignupFormFields.birthDate),
  };

  const validated = completeSignupSchema.safeParse(fields);

  if (!validated.success) {
    return json(validated.error.format());
  }

  const response = await completeSignup(validated.data, withToken(accessToken));
  if (response.ok) {
    return redirect("dashboard", await withSessionFromRequest(request));
  }
  return null;
};

export const loader: LoaderFunction = ({ request }) => authorize(request);
export const Complete: FunctionComponent = () => {
  return (
    <MainLayout>
      <CompleteSignupContainer />
    </MainLayout>
  );
};

export default Complete;
