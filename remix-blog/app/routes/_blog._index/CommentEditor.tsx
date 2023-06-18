import { IBlogPost } from "~/types";
import { blogFetch } from "~/blog-fetch";
import { apiUrl } from "~/config";
import CommentEditorForm from "~/routes/_blog._index/CommentEditorForm";

type CommentEditorProps = {
  post: IBlogPost;
};

export function CommentEditor({ post: { id: postId } }: CommentEditorProps) {
  return <CommentEditorForm postId={postId} />;
}
