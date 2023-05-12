import { componentLog } from "@/app/logger";

export type OrderBy = "asc" | "desc";

export type Article = {
  id: string;
  title: string;
};

const articles: Article[] = [
  { id: "1", title: "One" },
  { id: "2", title: "Two" },
  { id: "3", title: "Three" },
  { id: "4", title: "Four" },
];

export function getArticles(orderBy: OrderBy) {
  componentLog("getArticles", orderBy);

  if (orderBy === "asc") {
    return articles;
  }

  return [...articles].reverse();
}
