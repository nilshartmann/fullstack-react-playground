export type IUser = {
  id: string;
  login: string;
  name: string;
};

export type BlogPostData = {
  id: string;
  userId: string;
  title: string;
  tags: string[];
  date: string;
  body: string;
};

export type IBlogPost = BlogPostData & {
  newestComment: IComment | null;
};

export type IComment = {
  id: number;
  postId: string;
  comment: string;
};
