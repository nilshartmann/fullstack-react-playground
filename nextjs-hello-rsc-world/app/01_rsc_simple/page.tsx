import chalk from "chalk";
import { getArticles, OrderBy } from "@/app/articles";
import ArticleList from "@/app/01_rsc_simple/ArticleList";
import { componentLog } from "@/app/logger";
import { redirect } from "next/navigation";

// console.log("FILENAME", __filename);

type ArticleListProps = {
  searchParams: {
    orderBy?: OrderBy;
  };
};
// Regular RSC
// => Server Component we do not have React state here,
//    but need to use state from the URL (or cookies, headers, ...)
export default function RscArticlePage({ searchParams }: ArticleListProps) {
  componentLog("RscArticlePage", { searchParams });

  const { orderBy = "asc" } = searchParams;

  const articles = getArticles(orderBy);

  return <ArticleList articles={articles} currentOrder={orderBy} />;
}
