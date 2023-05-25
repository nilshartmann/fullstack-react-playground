import { componentLog } from "@/app/component-log";

/**
 * simple wrapper around fetch, just for logging
 */
export async function blogFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  componentLog("blogFetch", "Request start to", { input });
  const response = fetch(input, init);

  return response;
}
