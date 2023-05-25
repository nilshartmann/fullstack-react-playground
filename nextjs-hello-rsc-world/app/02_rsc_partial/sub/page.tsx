import { componentLog } from "@/app/logger";
import Link from "next/link";
import AppLink from "@/app/AppLink";

export default function SubPage() {
  componentLog("SubPage");
  return (
    <div>
      <AppLink href={"/02_rsc_partial/sub/detail"}>Detail!</AppLink>
      <p>SubPage</p>
    </div>
  );
}
