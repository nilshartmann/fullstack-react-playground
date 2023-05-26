import PostEditor from "@/app/(blog)/add/PostEditor";
import { INewBlogPost } from "@/types";
import { blogFetch } from "@/app/blog-fetch";
import { apiUrl } from "@/app/config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { delayPostList, delaySavePost } from "@/app/demo-config";

export default function PostEditorPage() {
  async function savePost({ body, title }: INewBlogPost) {
    "use server";

    if (!body) {
      throw new Error("No body!");
    }

    if (!title) {
      throw new Error("No title");
    }

    const response = await blogFetch(
      apiUrl(`/posts`, { slow: delaySavePost }),
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ body, title }),
      }
    );

    if (response.status === 201) {
      // Revalidate seems to not work yet
      // Various bug reports:
      // https://github.com/vercel/next.js/discussions/50288
      // https://github.com/vercel/next.js/issues/49368
      // https://github.com/vercel/next.js/issues/49778

      // revalidatePath(`/post/[postId]`);
      revalidatePath("/");
      redirect("/");
      return;
    }

    const responseBody = await response.json();
    console.log("save Post failed", response.status, body);
    return { error: responseBody.error ?? "Could not save post" };
  }
  return <PostEditor onSave={savePost} />;
}
