import type { ICommentResponse } from "~/types";
import { componentLog } from "~/component-log";
import MetaFetchData from "~/components/MetaFetchData";

type PostCommentsProps = {
  commentsResponse: ICommentResponse;
};

export default function PostComments({ commentsResponse }: PostCommentsProps) {
  componentLog("PostComments");
  const { data: comments, meta } = commentsResponse;
  return (
    <MetaFetchData meta={meta}>
      <div className={"Container"}>
        <h1>Comments</h1>
        {comments.map((comment) => (
          <p key={comment.id}>{comment.comment}</p>
        ))}
      </div>
    </MetaFetchData>
  );
}
