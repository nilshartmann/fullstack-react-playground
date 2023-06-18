import AddCommentButton from "@/app/components/AddCommentButton";
import { addComment } from "@/app/articles";
import { revalidatePath } from "next/cache";

// Schritt 1: "nur" Speichern (form-action und Submit Button)
// Schritt 2: AddCommentButton

export function AddCommentForm({ articleId }: { articleId: string }) {
  async function saveComment(formData: FormData) {
    "use server";

    const comment = formData.get("comment") as string;

    await addComment(articleId, comment);
    revalidatePath("/");
  }

  return (
    <form action={saveComment}>
      <label>
        New Comment
        <input type="text" name="comment" />
      </label>
      <button type={"submit"}>Add</button>
    </form>
  );
}
