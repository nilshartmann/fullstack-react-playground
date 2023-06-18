import { IComment } from "@/app/articles";

type CommentsListProps = {
  commentsPromise: Promise<IComment[]>;
};

export async function CommentsList({ commentsPromise }: CommentsListProps) {
  const comments = await commentsPromise;

  return (
    <div className="Container">
      <h2>Comments</h2>
      {comments.map((c) => (
        <article key={c.id}>
          <p>{c.comment}</p>
        </article>
      ))}
    </div>
  );
}
