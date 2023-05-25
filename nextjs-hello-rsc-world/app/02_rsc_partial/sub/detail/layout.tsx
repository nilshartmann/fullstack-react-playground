import { PropsWithChildren } from "react";
import { componentLog, timeString } from "@/app/logger";

export const revalidate = 20;

export default function DetailLayout({ children }: PropsWithChildren) {
  const time = timeString();
  componentLog("DetailLayout", time);
  return (
    <div className={"border-amber-700 border-2 p-2"}>
      <p>
        DetailLayout created: {time}. Revalidate: {revalidate}
      </p>
      {children}
    </div>
  );
}
