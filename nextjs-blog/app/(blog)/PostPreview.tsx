import { IBlogPost } from "@/types";
import { dateTimeString } from "@/app/components/date-formatter";
import Link from "next/link";
import { CommentEditor } from "@/app/(blog)/CommentEditor";
import AppLink from "@/app/components/AppLink";

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
      <AppLink href={`/post/${post.id}`} prefetch={false}>
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
