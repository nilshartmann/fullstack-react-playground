import { IBlogPost, PostsOrderBy } from "@/types";
import PostPreview from "@/app/(blog)/PostPreview";
import { apiUrl } from "@/app/config";
import { delayPostList, delayTagCloud } from "@/app/demo-config";

async function fetchPosts(orderBy: PostsOrderBy): Promise<IBlogPost[]> {
  const response = await fetch(
    apiUrl("/posts", { order_by: orderBy }, delayPostList)
  );
  const posts = await response.json();

  return posts;
}

type PostListProps = {
  orderBy: PostsOrderBy;
};

export default async function PostList({ orderBy }: PostListProps) {
  const blogPosts = await fetchPosts(orderBy);

  return (
    <div>
      <div className={"PostList"}>
        {blogPosts.map((p) => (
          <div key={p.id}>
            <PostPreview post={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
