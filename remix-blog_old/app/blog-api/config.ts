type SP = Record<string, string>;
export function apiUrl(
  path: string,
  searchParams: SP,
  slowdown?: boolean
): string;
export function apiUrl(path: string, slowdown?: boolean): string;
export function apiUrl(
  path: string,
  searchParams?: SP | boolean,
  slowdown?: boolean
): string {
  let _slowdown = slowdown || false;
  let _searchParams: SP = {};

  if (typeof searchParams === "boolean") {
    _slowdown = searchParams;
  }
  if (typeof searchParams === "object") {
    Object.assign(_searchParams, searchParams);
  }

  if (_slowdown) {
    _searchParams["slow"] = "";
  }

  const p = Object.keys(_searchParams).length
    ? `?${new URLSearchParams(_searchParams).toString()}`
    : "";

  return `http://localhost:7000${path}${p}`;
}
