import { IComment } from "@/types";

type PostCommentsProps = {
  comments: Promise<IComment[]>;
};

export default async function PostComments({ comments }: PostCommentsProps) {
  const _comments = await comments;
  return (
    <div className={"Container"}>
      <h1>Comments</h1>
      {_comments.map((comment) => (
        <p key={comment.id}>{comment.comment}</p>
      ))}
    </div>
  );
}
