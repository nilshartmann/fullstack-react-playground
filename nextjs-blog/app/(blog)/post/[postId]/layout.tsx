import PageHeader from "@/app/components/PageHeader";
import { redirect } from "next/navigation";
import HomeButton from "@/app/(blog)/post/[postId]/HomeButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader button={<HomeButton />}>Blog Post</PageHeader>
      {children}
    </>
  );
}
