import Link from "next/link";

type Args = Parameters<typeof Link>[0];

export default function AppLink(p: Args) {
  const className = "underline decoration-2 decoration-blue-700";

  return <Link className={className} {...p} />;
}
