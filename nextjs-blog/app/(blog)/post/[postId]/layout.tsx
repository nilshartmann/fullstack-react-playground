import PageHeader from "@/app/components/PageHeader";
import HomeButton from "@/app/(blog)/post/[postId]/HomeButton";
import { Suspense } from "react";
import Loading from "@/app/(blog)/post/[postId]/loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader button={<HomeButton />}>Blog Post</PageHeader>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
