import React from "react";
import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/node";
import { injectStyles, createStylesServer } from "@mantine/remix";
import { createInstance } from "i18next";
import { i18next } from "~/i18next.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import i18n from "~/i18n";
import { resolve } from "node:path";
import { DrawerProvider } from "~/util/hooks";

const server = createStylesServer();

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state
  const instance = createInstance();

  // Then we could detect locale from the request
  const lng = await i18next.getLocale(request);
  // And here we detect what namespaces the routes about to render want to use
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18n, // spread the configuration
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render wants to use
      backend: {
        loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
      },
    });
  const markup = renderToString(
    <I18nextProvider i18n={instance}>
      <DrawerProvider>
        <RemixServer context={remixContext} url={request.url} />
      </DrawerProvider>
    </I18nextProvider>
  );
  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>${injectStyles(markup, server)}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
