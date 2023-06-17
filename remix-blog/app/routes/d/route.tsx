import { Outlet } from "@remix-run/react";

export default function D() {
  return (
    <div>
      {" "}
      <h1>
        XX
        <Outlet />
      </h1>
    </div>
  );
}
