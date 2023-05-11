import { marked } from "marked"; // 36 K (gzipped: 11 K)

import { IBlogPost } from "@/types";
import { dateTimeString } from "@/app/components/date-formatter";

type PostProps = {
  post: IBlogPost;
};
export default function Post({ post }: PostProps) {
  const date = dateTimeString(post.date);
  const body = marked.parse(post.body);

  return (
    <article className="Container">
      {post.date && <p className="Date">{date}</p>}
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </article>
  );
}
