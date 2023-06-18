import {
  IBlogPost,
  IBlogPostResponse,
  IComment,
  ICommentResponse,
} from "@/types";
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
import MetaFetchData from "@/app/components/MetaFetchData";
import { blogFetch } from "@/app/blog-fetch";
import { componentLog } from "@/app/component-log";

// export async function generateStaticParams() {
//   return [{ postId: "1" }, { postId: "2" }];
// }

async function fetchPost(postId: string): Promise<IBlogPostResponse> {
  const response = await blogFetch(
    apiUrl(`/posts/${postId}`, { slow: delayPostPage }),
    {
      next: {
        tags: [`/posts/${postId}`],
      },
    }
  );
  const posts = await response.json();

  return posts;
}

async function fetchComments(postId: string): Promise<ICommentResponse> {
  const response = await blogFetch(
    apiUrl(`/posts/${postId}/comments`, { slow: delayPostComments }),
    {
      next: {
        tags: [`/posts/${postId}/comments`],
      },
    }
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
  componentLog("PostPage", { params });
  const postPromise = fetchPost(params.postId);
  const comments = fetchComments(params.postId);

  // https://beta.nextjs.org/docs/data-fetching/fetching#parallel-data-fetching
  // We want to render posts as soon as we have them.
  // No need to wait for comments
  // (btw: Loading Indicator for "posts" in loading.tsx in this example)
  const post = await postPromise;

  return (
    <>
      <MetaFetchData meta={post.meta}>
        <Post post={post.data} />
      </MetaFetchData>

      <Suspense
        fallback={<LoadingIndicator>Loading Comments...</LoadingIndicator>}
      >
        <PostComments commentsResponse={comments} />
      </Suspense>
    </>
  );
}

//
// {/**/}
