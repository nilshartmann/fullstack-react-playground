import { Suspense } from "react";
import PageHeader from "~/components/PageHeader";
import HomeButton from "~/routes/_blog.post.$postId._index/HomeButton";
import LoadingIndicator from "~/components/LoadingIndicator";
import { Outlet } from "@remix-run/react";

export default function RootLayout() {
  return (
    <>
      <PageHeader button={<HomeButton />}>Blog Post</PageHeader>
      <Suspense fallback={<LoadingIndicator />}>
        <Outlet />
      </Suspense>
    </>
  );
}
