"use client";

import { useState } from "react";

type SaveError = {
  error: string;
};

type CommentEditorFormProps = {
  onSave(formData: FormData): Promise<SaveError | undefined>;
};

export default function CommentEditorForm({ onSave }: CommentEditorFormProps) {
  const [comment, setComment] = useState("");
  const [result, setResult] = useState<string | true | null>(null);

  const submitForm = async (formData: FormData) => {
    const result = await onSave(formData);
    if (result?.error) {
      setResult(result.error);
    } else {
      setComment("");
      setResult(true);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setResult(null);
  };

  const submitDisabled = comment === "";

  return (
    <form className={"Flex"} action={submitForm}>
      <label>
        Add your comment
        <input
          type="text"
          value={comment}
          name={"comment"}
          onChange={handleCommentChange}
        />
      </label>
      <button type="submit" disabled={submitDisabled}>
        Save
      </button>
      {result === true && <p>Comment saved!</p>}
      {typeof result === "string" && <p>{result}</p>}
    </form>
  );
}
