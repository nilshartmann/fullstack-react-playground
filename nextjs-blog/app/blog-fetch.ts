import { componentLog } from "@/app/component-log";
import { disableNextJsFetchCache } from "@/app/demo-config";

function disableCache(init?: RequestInit): RequestInit | undefined {
  if (!disableNextJsFetchCache) {
    return init;
  }

  return init
    ? {
        ...init,
        next: {
          revalidate: 0,
        },
      }
    : {
        next: {
          revalidate: 0,
        },
      };
}

/**
 * simple wrapper around fetch, just for logging
 */
export async function blogFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  componentLog("blogFetch", "Request start to", { input });

  // for demo purposes disable fetch cache at all

  const response = fetch(input, disableCache(init));

  return response;
}
