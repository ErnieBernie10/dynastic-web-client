import * as React from "react";
import { FunctionComponent } from "react";
import { LoaderFunction } from "@remix-run/node";
import { handleRedirect } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) =>
  handleRedirect(request);

interface CallbackProps {}

export const Callback: FunctionComponent<CallbackProps> = () => (
  <div>Callback</div>
);
