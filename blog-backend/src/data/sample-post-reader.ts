import { BlogPostData, IUser } from "../types";

const fs = require("fs");

export default function readPosts() {
  const posts: Record<string, BlogPostData> = {};
  const newPost = () =>
    ({
      id: `${Object.keys(posts).length + 1}`,
      body: "",
    } as Partial<BlogPostData>);
  let currentPost = newPost();

  const storeCurrentPost = () => {
    posts[currentPost.id!] = currentPost as unknown as BlogPostData;
    currentPost = newPost();
  };

  try {
    // read contents of the file
    const data = fs.readFileSync("./src/data/.example-posts.txt", "UTF-8");

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    lines.forEach((line: string) => {
      line = line.trim();
      if (line.startsWith("---")) {
        storeCurrentPost();
      } else if (line.startsWith("title:")) {
        currentPost.title = line.substring("title:".length).trim();
      } else if (line.startsWith("date:")) {
        currentPost.date = line.substring("date:".length).trim();
      } else if (line.startsWith("user:")) {
        currentPost.userId = line.substring("user:".length).trim();
      } else if (line.startsWith("tags:")) {
        currentPost.tags = line
          .substring("tags:".length)
          .trim()
          .split(",")
          .map((t) => t.trim());
      } else if (line === "") {
        currentPost.body = currentPost.body + "\n";
      } else {
        currentPost.body = currentPost.body + line;
      }
    });

    storeCurrentPost();
  } catch (err) {
    console.error(err);
  }

  return posts;
}
