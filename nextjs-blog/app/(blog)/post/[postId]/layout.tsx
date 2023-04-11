import PageHeader from "@/app/components/PageHeader";
import { redirect } from "next/navigation";
import HomeButton from "@/app/(blog)/post/[postId]/HomeButton";
import Subpage from "@/app/(blog)/xxx/Subpage";
import {Suspense} from "react";
import Loading from "@/app/(blog)/post/[postId]/loading";
import LoadingIndicator from "@/app/components/LoadingIndicator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader button={<HomeButton />}>Blog Post</PageHeader>
      <Suspense fallback={<Loading />}>
      {children}
      </Suspense>
    </>
  );
}
