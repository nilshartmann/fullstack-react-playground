import { componentLog } from "~/component-log";

/**
 * simple wrapper around fetch, just for logging
 */
export async function blogFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  componentLog("blogFetch", "Request start to", { input });

  // for demo purposes disable fetch cache at all

  const response = fetch(input, init);

  return response;
}
