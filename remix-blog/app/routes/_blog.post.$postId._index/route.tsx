import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { blogFetch } from "~/blog-fetch";
import type { IBlogPostResponse, ICommentResponse } from "~/types";
import { apiUrl } from "~/config";
import { delayPostComments, delayPostPage } from "~/demo-config";
import LoadingIndicator from "~/components/LoadingIndicator";
import MetaFetchData from "~/components/MetaFetchData";
import { Suspense } from "react";
import Post from "~/routes/_blog.post.$postId._index/Post";
import PostComments from "~/routes/_blog.post.$postId._index/PostComments";

async function fetchPost(postId: string): Promise<IBlogPostResponse> {
  const response = await blogFetch(
    apiUrl(`/posts/${postId}`, { slow: delayPostPage })
  );
  const posts = await response.json();

  return posts;
}

async function fetchComments(postId: string): Promise<ICommentResponse> {
  const response = await blogFetch(
    apiUrl(`/posts/${postId}/comments`, { slow: delayPostComments })
  );
  const comments = await response.json();

  return comments;
}

export async function loader({ params }: LoaderArgs) {
  console.log("PARAMS", params);
  const postId = params.postId;
  if (!postId) {
    // todo... but should not happen anyway...
    throw new Error("No post id in search params!");
  }

  const [post, comments] = await Promise.all([
    fetchPost(postId),
    fetchComments(postId),
  ]);

  // todo defer!

  return { post, comments };
}

export default function PostPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <MetaFetchData meta={data.post.meta}>
        <Post post={data.post.data} />
      </MetaFetchData>

      <Suspense
        fallback={<LoadingIndicator>Loading Comments...</LoadingIndicator>}
      >
        <PostComments commentsResponse={data.comments} />
      </Suspense>
    </>
  );
}
