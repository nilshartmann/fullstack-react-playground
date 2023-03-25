import LinkButton from "~/components/LinkButton";
import PageHeader from "~/components/PageHeader";
import { Main, Sidebar, TwoColumnLayout } from "~/components/Layout";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader({ params }: LoaderArgs) {
  console.log("params", params);

  return {
    postId: params.postId || "",
  } as const;
}

export default function PostPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <PageHeader actionButton={<LinkButton to={"/"}>Home</LinkButton>}>
        Home
      </PageHeader>
      <TwoColumnLayout>
        <Main>
          <h1>{data.postId}</h1>
        </Main>
        <Sidebar>
          <div>
            <h2 className={"text-2xl font-bold"}>Tags</h2>
            <div className={"bg-grey-1"}>JSX</div>
          </div>
        </Sidebar>
      </TwoColumnLayout>
    </>
  );
}
