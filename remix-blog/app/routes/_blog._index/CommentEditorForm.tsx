"use client";

import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { AddCommentResult } from "~/routes/_blog.post.$postId.comments._index/route";

// Requirements:
//   - disable submit button as long as comment-Field is empty
//   - after successful submit:
//      - show "success" message
//      - clear input field
//   - after error:
//      - show error message
//      - leave input field unmodified
//   - if user enters first character, remove info/error message

type CommentEditorFormProps = { postId: string };
export default function CommentEditorForm({ postId }: CommentEditorFormProps) {
  const commentForm = useFetcher<AddCommentResult>();
  const [comment, setComment] = useState("");
  const [result, setResult] = useState<string | true | null>(null);

  useEffect(() => {
    if (commentForm.state === "idle") {
      if (commentForm.data?.success) {
        setComment("");
        setResult(true);
      }
      if (commentForm.data?.success === false) {
        setResult(commentForm.data.error);
      }
    }
  }, [commentForm]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setResult(null);
  };

  const submitDisabled = comment === "" || commentForm.state === "submitting";

  return (
    <commentForm.Form
      className={"Flex"}
      method="post"
      action={`/post/${postId}/comments`}
    >
      <label>
        Add your comment
        <input
          type="text"
          value={comment}
          name={"comment"}
          onChange={handleCommentChange}
          disabled={commentForm.state === "submitting"}
        />
      </label>
      <button type="submit" disabled={submitDisabled}>
        Save
      </button>
      {result === true && <p>Comment saved!</p>}
      {typeof result === "string" && <p>{result}</p>}
    </commentForm.Form>
  );
}
