import PageHeader from "@/app/components/PageHeader";
import ButtonBar from "@/app/components/ButtonBar";
import PostList from "@/app/(blog)/PostList";
import TagCloud from "@/app/(blog)/TagCloud";
import OrderByButton from "@/app/(blog)/OrderByButton";
import { ORDER_BY_SEARCH_PARAM } from "@/types";
import { cookies } from "next/headers";
import Link from "next/link";
type PostListPageProps = {
  searchParams?: { [key: string]: string };
};
export const revalidate = 2;
export default function PostListPage({ searchParams }: PostListPageProps) {
  console.log("Post List Page!", Date.now());
  const x = cookies(); // workaround to make this component dynamic rendered
  const orderBy = searchParams?.[ORDER_BY_SEARCH_PARAM] || "";
  return (
    <div className={"PostListPage"}>
      <PageHeader button={<button>New Blog Post</button>}>
        Next.JS Blog Example
        <Link href={"/user"}>User</Link>
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
