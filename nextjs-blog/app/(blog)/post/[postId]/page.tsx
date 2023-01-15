import { IBlogPost, IComment } from "@/types";
import { apiUrl } from "@/app/config";
import {
  delayPostComments,
  delayPostList,
  delayPostPage,
} from "@/app/demo-config";
import PageHeader from "@/app/components/PageHeader";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import { Suspense } from "react";
import Post from "@/app/(blog)/post/[postId]/Post";
import PostComments from "@/app/(blog)/post/[postId]/PostComments";

export async function generateStaticParams() {
  return [{ postId: "1" }, { postId: "2" }];
}

async function fetchPost(postId: string): Promise<IBlogPost> {
  const response = await fetch(apiUrl(`/posts/${postId}`, delayPostPage));
  const posts = await response.json();

  return posts;
}

async function fetchComments(postId: string): Promise<IComment[]> {
  const response = await fetch(
    apiUrl(`/posts/${postId}/comments`, delayPostComments)
  );
  const comments = await response.json();

  return comments;
}

type PostPageParams = {
  postId: string;
};
type PostPageProps = {
  params: PostPageParams;
};
export default async function PostPage({ params }: PostPageProps) {
  const postPromise = fetchPost(params.postId);
  const comments = fetchComments(params.postId);

  // https://beta.nextjs.org/docs/data-fetching/fetching#parallel-data-fetching
  // We want to render posts as soon as we have them.
  // No need to wait for comments
  // (btw: Loading Indicator for "posts" in loading.tsx in this example)
  const post = await postPromise;

  return (
    <>
      <Post post={post} />
      <Suspense
        fallback={<LoadingIndicator>Loading Comments</LoadingIndicator>}
      >
        {/* @ts-expect-error Server Component */}
        <PostComments comments={comments} />
      </Suspense>
    </>
  );
}
