import chalk from "chalk";
import timeString from "@/app/components/time-string";

export function componentLog(name: string, ...args: any) {
  console.log(chalk.cyan(timeString()), chalk.blue(name.padEnd(15)), ...args);
}
