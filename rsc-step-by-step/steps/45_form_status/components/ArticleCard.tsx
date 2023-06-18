import { IArticle } from "@/app/articles";

type ArticleCardProps = {
  articlePromise: Promise<IArticle>;
};

export async function ArticleCard({ articlePromise }: ArticleCardProps) {
  const article = await articlePromise;

  return (
    <article className={"Container"}>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
    </article>
  );
}
