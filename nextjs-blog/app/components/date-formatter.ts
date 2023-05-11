export function dateTimeString(isoString: string | undefined) {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function timeString(isoString: string | number) {
  if (!isoString) {
    return "";
  }

  const date = new Date(isoString);

  return new Intl.DateTimeFormat("de-DE", {
    timeStyle: "medium",
  }).format(date);
}
