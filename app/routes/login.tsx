import * as React from "react";
import { LoaderFunction, redirect } from "@remix-run/node";
import { authorize } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await authorize(request);
  return redirect("/dashboard");
};

const Login = () => <div>Login</div>;

export default Login;
