export type IBlogPost = {
  id: string;
  userId: string;
  title: string;
  tags: string[];
  date: string;
  body: string;

  newestComment: IComment | null;
};

export type ITags = Record<string, number>;

export type IComment = {
  id: string;
  postId: string;
  comment: string;
};

export const ORDER_BY_SEARCH_PARAM = "order_by";

export type PostsOrderBy = "date_asc" | "date_desc";
