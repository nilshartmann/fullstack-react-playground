import { PropsWithChildren } from "react";
import { componentLog, timeString } from "@/app/logger";

export default function SearchLayout({ children }: PropsWithChildren) {
  const time = timeString();
  componentLog("SearchLayout", time);
  return (
    <div className={"border-amber-700 border-2 p-4"}>
      <p>SearchLayout created: {time}</p>
      {children}
    </div>
  );
}
