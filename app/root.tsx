import React, { useMemo } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { createEmotionCache, Text } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import styles from "~/app.css";
import { i18next } from "~/i18next.server";
import { json } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { IS_CLIENT } from "~/constants";
import { MainLayout } from "~/layouts/MainLayout";
import { RootProviders } from "~/RootProviders";
import { useChangeLanguage } from "remix-i18next";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

createEmotionCache({ key: "mantine" });

export const links = () => [{ rel: "stylesheet", href: styles }];

export type LocaleLoaderData = { locale: string };

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);
  return json<LocaleLoaderData>({ locale });
};

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "app",
};

if (!IS_CLIENT) {
  if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  const { message, trace } = useMemo(() => {
    try {
      return JSON.parse(error.message);
    } catch (e) {
      return { error };
    }
  }, [error]);

  return (
    // TODO: Figure out how to do dynamic locale here
    <html lang="en">
      <head>
        <StylesPlaceholder />
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollRestoration />
        <RootProviders>
          <MainLayout>
            <div style={{ marginTop: 50 }}>
              <Text size="xl">There was an error</Text>
              <hr />
              <p>{message}</p>
              <p>{trace}</p>
            </div>
          </MainLayout>
        </RootProviders>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  const { locale } = useLoaderData<LocaleLoaderData>();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <StylesPlaceholder />
        <Meta />
        <Links />
      </head>
      <body>
        <RootProviders>
          <Outlet />
        </RootProviders>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
