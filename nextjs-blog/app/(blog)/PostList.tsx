import { IPostsResponse, PostsOrderBy } from "@/types";
import PostPreview from "@/app/(blog)/PostPreview";
import { apiUrl } from "@/app/config";
import { delayPostList } from "@/app/demo-config";
import MetaFetchData from "@/app/components/MetaFetchData";
import { blogFetch } from "@/app/blog-fetch";
import { componentLog } from "@/app/component-log";

async function fetchPosts(orderBy: PostsOrderBy): Promise<IPostsResponse> {
  const response = await blogFetch(
    apiUrl("/posts", { order_by: orderBy, slow: delayPostList }),
    // https://stackoverflow.com/a/43725133/6134498
    { mode: "cors" }
  );

  // looking at the request-id HTTP header,
  // it becomes obvious that Next caches or request

  // it still re-renders PostList(Page), because PostPage
  // is dynamic component, as it uses Query Params
  componentLog("fetchPosts", "response received", {
    requestId: response.headers.get("x-blog-api-request-id"),
  });

  return response.json();
}

type PostListProps = {
  orderBy: PostsOrderBy;
};

export default async function PostList({ orderBy }: PostListProps) {
  componentLog("PostList", { orderBy });
  const blogPosts = await fetchPosts(orderBy);

  return (
    <div>
      <div className={"PostList"}>
        <MetaFetchData meta={blogPosts.meta}>
          {blogPosts.data.map((p) => (
            <div key={p.id}>
              <PostPreview post={p} />
            </div>
          ))}
        </MetaFetchData>
      </div>
    </div>
  );
}
