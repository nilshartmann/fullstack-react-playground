import { IBlogPost, IPostsResponse, PostsOrderBy } from "~/types";
import MetaFetchData from "~/components/MetaFetchData";
import PostPreview from "~/routes/_blog._index/PostPreview";

type PostListProps = {
  blogPosts: IPostsResponse;
  orderBy: PostsOrderBy;
};

export default function PostList({ orderBy, blogPosts }: PostListProps) {
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
