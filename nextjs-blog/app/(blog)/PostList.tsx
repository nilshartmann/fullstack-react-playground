import { IPostsResponse, PostsOrderBy } from "@/types";
import PostPreview from "@/app/(blog)/PostPreview";
import { apiUrl } from "@/app/config";
import { delayPostList } from "@/app/demo-config";
import MetaFetchData from "@/app/components/MetaFetchData";

async function fetchPosts(orderBy: PostsOrderBy): Promise<IPostsResponse> {
  const response = await fetch(
    apiUrl("/posts") // , { order_by: orderBy, slow: delayPostList })
  );

  return response.json();
}

type PostListProps = {
  orderBy: PostsOrderBy;
};

export default async function PostList({ orderBy }: PostListProps) {
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
