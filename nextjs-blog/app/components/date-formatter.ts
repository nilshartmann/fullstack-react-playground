export function dateTimeString(isoString: string | undefined) {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
