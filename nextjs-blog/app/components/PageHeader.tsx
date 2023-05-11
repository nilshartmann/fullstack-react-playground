import {ReactNode} from "react";

/**
 * Displays a header for each page, including some buttons (optionally)
 *
 * When this component is rendered on server, it stop's rendering at the buttons,
 * as the Buttons are Client-side components.
 *
 * The included PageTitle on the other hand is rendered on server side,
 * so its code won't be sent to the client.
 */
type PageHeaderProps = {
  children: ReactNode;
  button?: ReactNode;
}
export default function PageHeader({ children, button }: PageHeaderProps) {
  return (
    <div className={"PageHeader"}>
      <PageTitle>{children}</PageTitle>
      {!!button && <div>{button}</div>}
    </div>
  );
}

type PageTitleProps = {
  children: ReactNode;
}
function PageTitle({ children }: PageTitleProps) {
  return <h1>{children}</h1>;
}
