import * as React from "react";
import { FunctionComponent } from "react";
import { MainLayout } from "~/layouts/MainLayout";
import { CompleteSignupContainer } from "~/features/complete-signup-feature";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authorize } from "~/services/auth.server";
import { handleCompleteSignup } from "~/services/complete-signup.server";

export const action: ActionFunction = async ({ request }) => {
  const { accessToken } = await authorize(request);
  return handleCompleteSignup(accessToken, request);
};

export const loader: LoaderFunction = ({ request }) => authorize(request);
export const Complete: FunctionComponent = () => (
  <MainLayout>
    <CompleteSignupContainer />
  </MainLayout>
);

export default Complete;
