import { ArticleCard } from "@/app/components/ArticleCard";
import { fetchArticleSlow, fetchCommentsSlow } from "@/app/articles";
import { CommentsList } from "@/app/components/CommentsList";
import { Suspense } from "react";
import LoadingIndicator from "@/app/components/LoadingIndicator";

type ArticlePageProps = {
  params: { articleId: string };
};

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <div>
      <Suspense
        fallback={<LoadingIndicator>Loading articles</LoadingIndicator>}
      >
        {/* @ts-expect-error Async Server Component */}
        <ArticleCard articlePromise={fetchArticleSlow(params.articleId)} />
      </Suspense>

      <Suspense
        fallback={<LoadingIndicator>Loading comments</LoadingIndicator>}
      >
        {/* @ts-expect-error Async Server Component */}
        <CommentsList commentsPromise={fetchCommentsSlow(params.articleId)} />
      </Suspense>
    </div>
  );
}
