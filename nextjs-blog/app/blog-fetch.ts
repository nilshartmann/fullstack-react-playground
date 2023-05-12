/**
 * simple wrapper around fetch, just for logging
 */
export function blogFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  console.log(`[blogFetch] Request to '${input}'`);
  return fetch(input, init);
}
