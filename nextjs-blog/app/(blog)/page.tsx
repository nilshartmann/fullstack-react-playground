import PageHeader from "@/app/components/PageHeader";
import ButtonBar from "@/app/components/ButtonBar";
import PostList from "@/app/(blog)/PostList";
import TagCloud from "@/app/(blog)/TagCloud";
import { Suspense } from "react";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import OrderByButton from "@/app/(blog)/OrderByButton";
import { ORDER_BY_SEARCH_PARAM } from "@/types";
type PostListPageProps = {
  searchParams?: { [key: string]: string };
};
export default function PostListPage({ searchParams }: PostListPageProps) {
  const orderBy = searchParams?.[ORDER_BY_SEARCH_PARAM] || "";
  return (
    <div className={"PostListPage"}>
      <PageHeader button={<button>New Blog Post</button>}>
        Blog Posts
      </PageHeader>
      <div className={"Page"}>
        <div className={"Main"}>
          <ButtonBar>
            <OrderByButton orderBy={"date_desc"} />
            <OrderByButton orderBy={"date_asc"} />
          </ButtonBar>
          {/* @ts-expect-error Server Component */}
          <PostList orderBy={orderBy} />
        </div>
        <aside className={"Sidebar"}>
          {/*  SERVER COMPONENT */}
          <Suspense fallback={<LoadingIndicator />}>
            {/* @ts-expect-error Server Component */}
            <TagCloud />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
