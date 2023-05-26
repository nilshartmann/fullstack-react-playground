import { IComment, ICommentResponse } from "@/types";
import MetaFetchData from "@/app/components/MetaFetchData";
import { componentLog } from "@/app/component-log";

type PostCommentsProps = {
  commentsResponse: Promise<ICommentResponse>;
};

export default async function PostComments({
  commentsResponse,
}: PostCommentsProps) {
  componentLog("PostComments");
  const { data: comments, meta } = await commentsResponse;
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
