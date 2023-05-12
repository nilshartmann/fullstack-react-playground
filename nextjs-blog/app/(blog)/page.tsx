import PageHeader from "@/app/components/PageHeader";
import ButtonBar from "@/app/components/ButtonBar";
import PostList from "@/app/(blog)/PostList";
import TagCloud from "@/app/(blog)/TagCloud";
import OrderByButton from "@/app/(blog)/OrderByButton";
import { ORDER_BY_SEARCH_PARAM } from "@/types";
import timeString from "@/app/components/time-string";
type PostListPageProps = {
  searchParams?: { [key: string]: string };
};

// https://nextjs.org/docs/app/building-your-application/data-fetching/caching#segment-level-caching
// revalidate every 2 seconds
// export const revalidate = 2;

export default function PostListPage({ searchParams }: PostListPageProps) {
  console.log("Post List Page invoked", timeString(Date.now()), searchParams);
  const orderBy = searchParams?.[ORDER_BY_SEARCH_PARAM] || "";
  return (
    <div className={"PostListPage"}>
      <PageHeader button={<button>New Blog Post</button>}>
        Next.JS Blog Example
      </PageHeader>
      <div className={"Page"}>
        <div className={"Main"}>
          <ButtonBar>
            <OrderByButton orderBy={"date_desc"} />
            <OrderByButton orderBy={"date_asc"} />
          </ButtonBar>
          {/* @ts-expect-error https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error */}
          <PostList orderBy={orderBy} />
        </div>
        <aside className={"Sidebar"}>
          {/* @ts-expect-error Server Component https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error */}
          <TagCloud />
        </aside>
      </div>
    </div>
  );
}
