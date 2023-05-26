import { BlogPostData, IBlogPost, IComment } from "./types";
import readPosts from "./data/sample-post-reader";
import readUsers from "./data/sample-users";
import readSampleComments from "./data/sample-comments";

export const orderByDateNewestFirst = (p1: BlogPostData, p2: BlogPostData) =>
  new Date(p2.date).getTime() - new Date(p1.date).getTime();
export const orderByDateOldestFirst = (p1: BlogPostData, p2: BlogPostData) =>
  new Date(p1.date).getTime() - new Date(p2.date).getTime();

export default function createDataStore() {
  const users = readUsers();
  const posts = readPosts();
  const comments = readSampleComments();

  /**
   * Returns all comments for the given postId (or empty array)
   *
   * Posts are ordered: newest first
   */
  const commentsForPost = (postId: string): IComment[] => {
    const result = comments
      .filter((p) => p.postId === postId)
      .sort((c1, c2) => Number(c2.id) - Number(c1.id));
    return result;
  };

  const toBlogPost = (blogPost: BlogPostData) => ({
    ...blogPost,
    newestComment: commentsForPost(blogPost.id)[0],
  });

  return {
    insertPost({ title, body }: { title: string; body: string }): IBlogPost {
      const id = String(Object.keys(posts).length + 1);
      const data: BlogPostData = {
        id,
        title,
        body,
        date: new Date().toISOString(),
        tags: [],
        userId: "U2",
      };
      posts[id] = data;

      return toBlogPost(data);
    },

    getAllPosts(orderByFn = orderByDateNewestFirst): IBlogPost[] {
      const allPosts: IBlogPost[] = Object.values(posts).map(toBlogPost);
      allPosts.sort(orderByFn);
      return allPosts;
    },

    getPost(postId: string): IBlogPost | null {
      const blogPost = posts[postId];
      if (!blogPost) {
        return null;
      }
      return toBlogPost(blogPost);
    },

    getPostComments(postId: string): IComment[] | null {
      if (!posts[postId]) {
        return null;
      }

      return commentsForPost(postId);
    },

    addPostComment(postId: string, comment: string): number | null {
      if (!posts[postId]) {
        return null;
      }

      const id = comments.length + 1;

      const newComment: IComment = {
        id,
        comment,
        postId,
      };

      comments.push(newComment);

      return id;
    },

    getTags(): Record<string, number> {
      return Object.values(posts)
        .flatMap((p) => p.tags)
        .filter((tag) => !!tag) // filter out empty tags
        .reduce((tags, tag) => {
          const count = tags[tag] || 0;
          tags[tag] = count + 1;
          return tags;
        }, {} as Record<string, number>);
    },
  };
}
