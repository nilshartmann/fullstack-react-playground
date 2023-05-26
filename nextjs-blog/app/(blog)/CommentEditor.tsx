import { IBlogPost } from "@/types";
import { blogFetch } from "@/app/blog-fetch";
import { apiUrl } from "@/app/config";
import { revalidatePath, revalidateTag } from "next/cache";
import CommentEditorForm from "@/app/(blog)/CommentEditorForm";

type CommentEditorProps = {
  post: IBlogPost;
};

export function CommentEditor({ post: { id: postId } }: CommentEditorProps) {
  // addComment is a Server Action!
  async function addComment(form: FormData) {
    "use server";
    const comment = form.get("comment") as string;

    if (!postId) {
      throw new Error("No Post Id!");
    }

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

    if (response.status === 201) {
      // Revalidate seems to not work yet
      // Various bug reports:
      // https://github.com/vercel/next.js/discussions/50288
      // https://github.com/vercel/next.js/issues/49368
      // https://github.com/vercel/next.js/issues/49778

      // revalidatePath(`/post/[postId]`);
      revalidatePath("/");
      return;
    }

    const body = await response.json();
    console.log("save Comment failed", response.status, body);
    return { error: body.error ?? "Could not save comment" };
  }

  return <CommentEditorForm onSave={addComment} />;
}
