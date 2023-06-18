import { ActionArgs, json, TypedResponse } from "@remix-run/node";
import { blogFetch } from "~/blog-fetch";
import { apiUrl } from "~/config";

export type AddCommentResult =
  | {
      success: true;
    }
  | { success: false; error: string };

export async function action({
  params,
  request,
}: ActionArgs): Promise<TypedResponse<AddCommentResult>> {
  const formData = await request.formData();

  const postId = params.postId;

  if (!postId) {
    throw new Error("No Post Id!");
  }

  const comment = formData.get("comment") as string;

  if (!comment) {
    throw new Error("No comment!");
  }

  const response = await blogFetch(apiUrl(`/posts/${postId}/comments`), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });

  console.log("ADD COMMENT STATUS", response.status);

  if (response.ok) {
    return json({ success: true });
  }

  const body = await response.json();
  console.log("save Comment failed", response.status, body);
  return json({
    success: false,
    error: body.error ?? "Could not save comment",
  });
}
