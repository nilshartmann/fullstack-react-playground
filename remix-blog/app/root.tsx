import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./globals.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: "stylesheet", href: styles },
        { rel: "stylesheet", href: cssBundleHref },
      ]
    : [{ rel: "stylesheet", href: styles }]),
];

export const meta: V2_MetaFunction = () => [
  { title: "Blog Example!" },
  { description: "Blog Example App!" },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className={"Root"}>
          <div className={"App"}>
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
