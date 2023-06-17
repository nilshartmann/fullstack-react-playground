import { Link } from "@remix-run/react";

type Args = Parameters<typeof Link>[0];

// AppLink does not make sense in this example,
// it's just to make the source code easier
// comparable with the nextjs variant of this app

export default function AppLink(p: Args) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <Link {...p} />;
}
