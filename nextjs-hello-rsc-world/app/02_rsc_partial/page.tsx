import { getArticles, OrderBy } from "@/app/articles";
import ArticleList from "@/app/ArticleList";
import { componentLog } from "@/app/logger";
import Link from "next/link";
import AppLink from "@/app/AppLink";

export default function RscArticlePage() {
  componentLog("RscArticlePage");

  return (
    <div>
      <p>RscArticlePage</p>

      <AppLink href={"/02_rsc_partial/sub"}>Sub!</AppLink>
    </div>
  );
}
