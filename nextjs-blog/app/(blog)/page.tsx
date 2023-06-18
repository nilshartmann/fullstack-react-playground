import PageHeader from "@/app/components/PageHeader";
import ButtonBar from "@/app/components/ButtonBar";
import PostList from "@/app/(blog)/PostList";
import TagCloud from "@/app/(blog)/TagCloud";
import OrderByButton from "@/app/(blog)/OrderByButton";
import { ORDER_BY_SEARCH_PARAM, PostsOrderBy } from "@/types";
import timeString from "@/app/components/time-string";
import { componentLog } from "@/app/component-log";
import Link from "next/link";
import AppLink from "@/app/components/AppLink";
type PostListPageProps = {
  searchParams?: { [key: string]: string };
};

// https://nextjs.org/docs/app/building-your-application/data-fetching/caching#segment-level-caching
// revalidate every 2 seconds
// export const revalidate = 2;

export default function PostListPage({ searchParams }: PostListPageProps) {
  componentLog("PostListPage", { searchParams });
  const orderBy =
    (searchParams?.[ORDER_BY_SEARCH_PARAM] as PostsOrderBy) || "date_desc";
  return (
    <div className={"PostListPage"}>
      <PageHeader
        button={
          <AppLink className={"Button"} href={"/add"}>
            New Blog Post
          </AppLink>
        }
      >
        Next.JS Blog Example
      </PageHeader>
      <div className={"Page"}>
        <div className={"Main"}>
          <ButtonBar>
            <OrderByButton orderBy={"date_desc"} />
            <OrderByButton orderBy={"date_asc"} />
          </ButtonBar>
          <PostList orderBy={orderBy} />
        </div>
        <aside className={"Sidebar"}>
          <TagCloud />
        </aside>
      </div>
    </div>
  );
}
