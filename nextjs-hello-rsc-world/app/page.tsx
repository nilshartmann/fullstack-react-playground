import Image from "next/image";
import Link from "next/link";
import AppLink from "@/app/AppLink";

export default function Home() {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
      <ul>
        <li>
          <AppLink href="/01_rsc_simple">Server Components</AppLink>
        </li>
        <li>
          <AppLink href="/02_rsc_partial/sub/detail">Partial updates</AppLink>
        </li>
        <li>
          <AppLink href="/cc">Client Components</AppLink>
        </li>
      </ul>
    </div>
  );
}
