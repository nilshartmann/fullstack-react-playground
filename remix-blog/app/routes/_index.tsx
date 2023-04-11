import LinkButton from "~/components/LinkButton";
import Button from "~/components/Button";
import PostPreview from "~/components/PostPreview";
import PageHeader from "~/components/PageHeader";
import { Main, Sidebar, TwoColumnLayout } from "~/components/Layout";
import { apiUrl } from "~/blog-api/config";
import { delayPostList } from "~/blog-api/demo-config";
import type { IBlogPost } from "~/blog-api/types";
import { useLoaderData } from "@remix-run/react";
import TagCloud from "~/components/TagCloud";

export async function loader(): Promise<IBlogPost[]> {
  // important data
  const response = await fetch(
    apiUrl("/posts", { order_by: "date_asc" }, delayPostList)
  );
  const posts = await response.json();
  return posts;
}

export default function PostListPage() {
  const posts = useLoaderData<typeof loader>();
  return (
    <>
      <PageHeader
        actionButton={<LinkButton to={"/add"}>Create new Post</LinkButton>}
      >
        Blog Example Remix
      </PageHeader>
      <TwoColumnLayout>
        <Main>
          <div className={"space-y-4"}>
            <div className={"flex justify-end gap-x-4"}>
              <Button small>Order by Date (desc)</Button>
              <Button small disabled>
                Order by Date (asc)
              </Button>
            </div>
            {posts.map((p) => (
              <PostPreview key={p.id} post={p} />
            ))}
          </div>
        </Main>
        <Sidebar>
          <div>
            <h2 className={"text-2xl font-bold"}>Tags</h2>
            <TagCloud />
          </div>
        </Sidebar>
      </TwoColumnLayout>
    </>
  );
}
