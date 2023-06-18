import type { IBlogPost } from "~/types";
import { dateTimeString } from "~/components/date-formatter";
import AppLink from "~/components/AppLink";
import { CommentEditor } from "~/routes/_blog._index/CommentEditor";

function postAbstract({ body }: IBlogPost) {
  return body.length > 150 ? body.substring(0, 150) + "..." : body;
}

type PostPreviewProps = {
  post: IBlogPost;
};
export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <article className="Container">
      <p className="Date">{dateTimeString(post.date)}</p>
      <AppLink to={`/post/${post.id}`}>
        <h1>{post.title}</h1>
      </AppLink>
      <div className={"PreviewAbstract"}>
        <p>{postAbstract(post)}</p>
      </div>
      <NewestComment post={post} />
      <CommentEditor post={post} />
    </article>
  );
}

type NewestCommentProps = {
  post: IBlogPost;
};
function NewestComment({ post }: NewestCommentProps) {
  if (!post.newestComment) {
    return null;
  }

  return (
    <div>
      <p>
        Latest comment:
        <br />
        <em>{post.newestComment.comment}</em>
      </p>
    </div>
  );
}
