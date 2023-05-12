import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
      <ul>
        <li>
          <Link href="/01_rsc_simple">Server Components</Link>
        </li>
        <li>
          <Link href="/cc">Client Components</Link>
        </li>
      </ul>
    </div>
  );
}
