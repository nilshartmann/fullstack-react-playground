export type IResponseMetaData = {
  /** when did the CLIENT sent the request? */
  sentAt: string;
  /** when did the SERVER receive the request? */
  receivedAt: string;
  timeout?: string;
  cacheMaxAge?: string;
  requestId: string;
  path: string;
};

export type IPostsResponse = {
  data: IBlogPost[];
  meta: IResponseMetaData;
};

export type IBlogPostResponse = {
  data: IBlogPost;
  meta: IResponseMetaData;
};

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
