import { PropsWithChildren } from "react";
import { componentLog, timeString } from "@/app/logger";

export default function MoreLayout({ children }: PropsWithChildren) {
  const time = timeString();
  componentLog("MoreLayout", time);
  return (
    <div className={"border-amber-700 border-2 p-4"}>
      <p>MoreLayout created: {time}</p>
      {children}
    </div>
  );
}
