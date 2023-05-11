"use client";
import { useState } from "react";
import { IBlogPost } from "@/types";

type CommentEditorProps = {
  post: IBlogPost;
};

export function CommentEditor({ post }: CommentEditorProps) {
  const [comment, setComment] = useState("");

  async function handleSave() {
    // const { response, location } = await save(
    //   "/blog/comment",
    //   {
    //     comment,
    //     postId: post.id,
    //   },
    //
    //   // "Props" for server
    //   currentLocation
    // );
    //
    // updateCache(location, response);
    // setLocationFromServerResponse(response);
  }

  return (
    <div className={"Flex"}>
      <label>
        Add your comment
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <button disabled={!comment} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
