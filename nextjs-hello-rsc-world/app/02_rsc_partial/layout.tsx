import { componentLog, timeString } from "@/app/logger";
import { PropsWithChildren } from "react";

export default function PartialLayout({ children }: PropsWithChildren) {
  const time = timeString();
  componentLog("PartialLayout", time);
  return (
    <div>
      <p>Partial Layout. Created: {time}</p>

      {children}
    </div>
  );
}
