import { marked } from "marked"; // 36 K (gzipped: 11 K)

import { IBlogPost, INewBlogPost } from "@/types";
import { dateTimeString } from "@/app/components/date-formatter";

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
