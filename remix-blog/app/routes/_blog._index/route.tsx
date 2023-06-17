import { componentLog } from "~/component-log";
import {
  IPostsResponse,
  ITags,
  ORDER_BY_SEARCH_PARAM,
  PostsOrderBy,
} from "~/types";
import PageHeader from "~/components/PageHeader";
import AppLink from "~/components/AppLink";
import ButtonBar from "~/components/ButtonBar";
import TagCloud from "~/routes/_blog._index/TagCloud";
import { blogFetch } from "~/blog-fetch";
import { apiUrl } from "~/config";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { delayPostList } from "~/demo-config";
import PostList from "~/routes/_blog._index/PostList";
import OrderByButton from "~/routes/_blog._index/OrderByButton";

type BlogRouteData = {
  tags: ITags[];
  posts: IPostsResponse;
};

export async function loader({ request }: LoaderArgs): Promise<BlogRouteData> {
  const url = new URL(request.url);
  const orderBy =
    (url.searchParams.get(ORDER_BY_SEARCH_PARAM) as PostsOrderBy) ||
    "date_desc";

  const loadTagCloud = async () => {
    const response = await blogFetch(apiUrl("/tags", {}));
    const tags = response.json() as Promise<ITags[]>;
    return tags;
  };

  const loadPosts = async () => {
    const response = await blogFetch(
      apiUrl("/posts", { order_by: orderBy, slow: delayPostList }),
      // https://stackoverflow.com/a/43725133/6134498
      {
        mode: "cors",
      }
    );

    componentLog("fetchPosts", "response received", {
      requestId: response.headers.get("x-blog-api-request-id"),
    });

    return response.json() as Promise<IPostsResponse>;
  };

  const [tags, posts] = await Promise.all([loadTagCloud(), loadPosts()]);
  const result = { tags, posts };

  componentLog("BlogRoute loader", result);

  return result;
}

type PostListPageProps = {
  searchParams?: { [key: string]: string };
};

export default function PostListPage({ searchParams }: PostListPageProps) {
  componentLog("PostListPage", { searchParams });
  const data = useLoaderData<typeof loader>();
  const orderBy =
    (searchParams?.[ORDER_BY_SEARCH_PARAM] as PostsOrderBy) || "date_desc";
  return (
    <div className={"PostListPage"}>
      <PageHeader
        button={
          <AppLink className={"Button"} to={"/add"}>
            New Blog Post
          </AppLink>
        }
      >
        Remix Blog Example
      </PageHeader>
      <div className={"Page"}>
        <div className={"Main"}>
          <ButtonBar>
            <OrderByButton orderBy={"date_desc"} />
            <OrderByButton orderBy={"date_asc"} />
          </ButtonBar>
          <PostList orderBy={orderBy} blogPosts={data.posts} />
        </div>
        <aside className={"Sidebar"}>
          <TagCloud tags={data.tags} />
        </aside>
      </div>
    </div>
  );
}
