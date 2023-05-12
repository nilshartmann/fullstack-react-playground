import chalk from "chalk";

export function timeString(isoString?: string | number) {
  const date = new Date(isoString ?? Date.now());

  return new Intl.DateTimeFormat(
    "de-de", // german as an example, user selectable
    {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      fractionalSecondDigits: 3,
      hour12: false,
    }
  )
    .format(date)
    .replace(",", ".");
}

export function componentLog(name: string, ...args: any) {
  console.log(chalk.cyan(timeString()), chalk.blue(name.padEnd(15)), ...args);
}
