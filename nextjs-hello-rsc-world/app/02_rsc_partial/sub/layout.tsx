import { PropsWithChildren } from "react";
import { componentLog, timeString } from "@/app/logger";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
/*
Revalidation Frequency

    The lowest revalidate across each layout and page of a single route will determine the revalidation frequency of the entire route. This ensures that child pages are revalidated as frequently as their parent layouts.
 */

// https://nextjs.org/docs/app/building-your-application/data-fetching/caching#segment-level-caching
export const revalidate = 5;

export default function SubLayout({ children }: PropsWithChildren) {
  const time = timeString();
  componentLog("SubLayout", time);
  return (
    <div className={"border-amber-700 border-2 p-4"}>
      <p>
        SubLayout created: {time} Revalidate: {revalidate}
      </p>
      {children}
    </div>
  );
}
