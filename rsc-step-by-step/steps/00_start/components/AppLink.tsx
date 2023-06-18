import Link from "next/link";

type Args = Parameters<typeof Link>[0];

// Disable 'prefetch' by default for demo purposes.
//
export default function AppLink(p: Args) {
  return <Link prefetch={false} {...p} />;
}
