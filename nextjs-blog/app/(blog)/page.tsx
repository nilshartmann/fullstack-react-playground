import PageHeader from "@/app/components/PageHeader";
import ButtonBar from "@/app/components/ButtonBar";
import PostList from "@/app/(blog)/PostList";
import TagCloud from "@/app/(blog)/TagCloud";
import OrderByButton from "@/app/(blog)/OrderByButton";
import { ORDER_BY_SEARCH_PARAM } from "@/types";
import { cookies } from "next/headers";
type PostListPageProps = {
  searchParams?: { [key: string]: string };
};
export default function PostListPage({ searchParams }: PostListPageProps) {
  const x = cookies(); // workaround to make this component dynamic rendered
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
          {/* @ts-expect-error Server Component */}
          <TagCloud />
        </aside>
      </div>
    </div>
  );
}
