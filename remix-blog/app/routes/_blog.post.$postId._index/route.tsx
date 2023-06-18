import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
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
  const postId = params.postId;
  if (!postId) {
    // todo... but should not happen anyway...
    throw new Error("No postId in url!");
  }

  return defer({ post: fetchPost(postId), comments: fetchComments(postId) });
}

export default function PostPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Suspense
        fallback={<LoadingIndicator>Loading Articles...</LoadingIndicator>}
      >
        <Await resolve={data.post}>
          {(post) => {
            return (
              <MetaFetchData meta={post.meta}>
                <Post post={post.data} />
              </MetaFetchData>
            );
          }}
        </Await>
      </Suspense>

      <Suspense
        fallback={<LoadingIndicator>Loading Comments...</LoadingIndicator>}
      >
        <PostComments commentsResponse={data.comments} />
      </Suspense>
    </>
  );
}
