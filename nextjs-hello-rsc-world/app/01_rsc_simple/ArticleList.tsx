import { Article, OrderBy } from "@/app/articles";
import { componentLog } from "@/app/logger";
import OrderByButton from "@/app/01_rsc_simple/OrderByButton";

type ArticleListProps = {
  articles: Article[];
  currentOrder: OrderBy;
};

export default function ArticleList({
  articles,
  currentOrder,
}: ArticleListProps) {
  componentLog("ArticleList", {
    articles: articles.map((a) => a.id),
    currentOrder,
  });

  return (
    <div>
      <h1 className="font-bold text-2xl">Articles </h1>

      <ul>
        {articles.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>

      <OrderByButton currentOrder={currentOrder} />
    </div>
  );
}
