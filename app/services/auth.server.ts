/* eslint-disable no-unused-vars */
import { json, redirect, Session, TypedResponse } from "@remix-run/node";
import { AuthenticationClient } from "auth0";
import { commitSession, getSession } from "~/sessions";

export interface SessionUserInfo {
  userId: string;
  accessToken: string;
}

const AUTH_0 = {
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
};

export const auth0 = new AuthenticationClient({ ...AUTH_0 });

export const getToken = async (request: Request): Promise<SessionUserInfo> => {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("access_token");
  const userId = session.get("user_id");

  // No real need to validate if the token is correct. The Rest API will make sure it's correct
  if (!accessToken || !userId) {
    throw new Error("Unauthorized");
  }

  return { accessToken, userId };
};

export const withToken = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const withSession = async (session: Session) => ({
    // TODO: Make more secure in prod env
    headers: {
      "Set-Cookie": await commitSession(session),
      "Same-Site": "None",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  });

export const withSessionFromRequest = async (req: Request) => {
  const session = await getSession(req.headers.get("Cookie"));
  return withSession(session);
}

export const redirectAuth = (state: string, origin: string) => {
  const url = new URL(`https://${AUTH_0.domain}`);
  url.pathname = "/authorize";
  url.searchParams.set("audience", "https://dynastic-web.azurewebsites.net");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", AUTH_0.clientId);
  url.searchParams.set("redirect_uri", `${origin}/callback`);
  url.searchParams.set("scope", "openid profile email");
  url.searchParams.set("state", state);
  return url.toString();
};

export async function handleRedirect(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const { origin } = url;

  const state = url.searchParams.get("state");
  if (!state) return redirect("/login");

  const sessionState = session.get("auth0:state");
  if (sessionState === state) session.unset("auth0:state");
  else return redirect("/login");

  const code = url.searchParams.get("code");
  if (!code) return redirect("/login");
  const response = await auth0.oauth?.authorizationCodeGrant({
    code,
    redirect_uri: `${origin}/callback`,
  });

  if (!response) {
    return redirect("/");
  }

  const userProfile = await auth0.getProfile(response.access_token);

  session.set("access_token", response.access_token);
  session.set("email", userProfile.email);
  session.set("user_id", userProfile.sub);

  return redirect("/login", await withSession(session));
}

export const authorize = async (request: Request) => {
  const { origin } = new URL(request.url);
  try {
    const { accessToken, userId } = await getToken(request);
    return { userId, accessToken };
  } catch {
    // TODO: Add uuid
    const session = await getSession(request.headers.get("Cookie"));
    const state = encodeURIComponent("randomSecret");
    session.set("auth0:state", state);

    throw redirect(redirectAuth(state, origin), await withSession(session));
  }
};
