import { marked } from "marked";
import type { IBlogPost, INewBlogPost } from "~/types";
import { dateTimeString } from "~/components/date-formatter"; // 36 K (gzipped: 11 K)

type PostProps = {
  post: IBlogPost | INewBlogPost;
};
export default function Post({ post }: PostProps) {
  const date = "date" in post ? dateTimeString(post.date) : null;
  const body = marked.parse(post.body);

  return (
    <article className="Container">
      {date ?? <p className="Date">{date}</p>}
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </article>
  );
}
