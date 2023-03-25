import { apiUrl } from "~/blog-api/config";
import { delayTagCloud } from "~/blog-api/demo-config";
import { json } from "@remix-run/node";
import { ITags } from "~/blog-api/types";

export async function loader() {
  const response = await fetch(apiUrl("/tags", delayTagCloud));
  const tags = (await response.json()) as ITags[];

  return json(tags);
}

export type TagCloudResponse = typeof loader;
