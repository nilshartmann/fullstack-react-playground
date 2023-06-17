import type { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
};
export default function H1({ children }: HeadingProps) {
  const className = "text-3xl";

  return <h1 className={className}>{children}</h1>;
}
