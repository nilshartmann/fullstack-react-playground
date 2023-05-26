"use client";

import PageHeader from "@/app/components/PageHeader";
import Message from "@/app/components/Message";
import Post from "@/app/(blog)/post/[postId]/Post";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { INewBlogPost } from "@/types";
import LoadingIndicator from "@/app/components/LoadingIndicator";

type SaveError = {
  error: string;
};

type CommentEditorFormProps = {
  onSave(newPost: INewBlogPost): Promise<SaveError | undefined>;
};

export default function PostEditor({ onSave }: CommentEditorFormProps) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const clearDisabled = (!title && !body) || pending;
  const saveButtonDisabled = !title || !body || pending;

  const handleClear = () => {
    setTitle("");
    setBody("");
  };

  const handleCancel = () => {
    router.push("/");
  };

  const handleSave = () => {
    startTransition(async () => {
      await onSave({ title, body });
    });
  };

  return (
    <div>
      <PageHeader>Add Post</PageHeader>
      <div className={"Container"}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </label>
        {title ? (
          <Message type="info" msg="Title correctly filled" />
        ) : (
          <Message type="error" msg="Please enter a title" />
        )}

        <label>
          Body
          <textarea
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
          />
        </label>
        {body ? (
          <Message type="info" msg="Body correctly filled" />
        ) : (
          <Message msg="Please enter a body" />
        )}

        <button disabled={clearDisabled} onClick={handleClear}>
          Clear
        </button>
        <button onClick={handleCancel}>Cancel</button>
        <button disabled={saveButtonDisabled} onClick={handleSave}>
          {pending ? <LoadingIndicator secondary /> : "Save Post"}
        </button>
      </div>
      <div className={"Container PostEditorPreview"}>
        <h2>Preview: Your new Post</h2>
        <Post post={{ title, body }} />
      </div>
    </div>
  );
}
