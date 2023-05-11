import express, { Express, Request, Response } from "express";
import createDataStore, {
  orderByDateNewestFirst,
  orderByDateOldestFirst,
} from "./datastore";

const port = process.env.PORT || 7000;
const slowEnabled = process.env.USE_SLOW === "true";

const dataStore = createDataStore();
const app: Express = express();

// turn off etag for better reproducability in examples / demos
app.set("etag", false);
app.use(express.json());

let requestCounter = 0;

app.use((req, res, next) => {
  console.log(">>> Received Request to ", req.path);
  const meta: Record<string, string | number | Date> = {};
  ++requestCounter;
  meta.path = req.path;
  meta.requestId = `${requestCounter}`;
  if (req.query.cacheMaxAge !== undefined) {
    console.log(
      `Set Cache-control max-age to '${req.query.cacheMaxAge}' for request '${req.path}'`
    );
    res.set("Cache-control", `public, max-age=${req.query.cacheMaxAge}`);
    meta.cacheMaxAge = "" + req.query.cacheMaxAge;
  }
  const sentAtHeader = req.query["blogexample-sent-at"];
  meta.sentAt = typeof sentAtHeader === "string" ? sentAtHeader : "";

  meta.receivedAt = new Date();
  console.log("RECEIVED AT ", meta.receivedAt);
  res.locals.meta = meta;

  if (req.query.slow !== undefined && req.query.slow !== "false") {
    const timeout = 1200;
    meta.timeout = timeout;
    console.log(`Slow down ${timeout}ms`);
    setTimeout(next, timeout);
  } else {
    next();
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Blog Post API Backend");
});

app.get("/posts", (req: Request, res: Response) => {
  const orderBy = req.query["order_by"];
  const order =
    orderBy === "date_asc" ? orderByDateOldestFirst : orderByDateNewestFirst;
  res.json({
    data: dataStore.getAllPosts(order),
    meta: res.locals.meta,
  });
});

// Return Post with specified id (or 404)
app.get("/posts/:id", (req, res) => {
  const post = dataStore.getPost(req.params.id);

  if (!post) {
    return res.status(404).json({ error: `Post '${req.params.id}' not found` });
  }

  return res.status(200).json({
    data: post,
    meta: res.locals.meta,
  });
});

// Return all comments for post or empty array (or 404 if posts not found)
app.get("/posts/:id/comments", (req, res) => {
  const post = dataStore.getPostComments(req.params.id);

  if (!post) {
    return res.status(404).json({ error: `Post '${req.params.id}' not found` });
  }

  return res.status(200).json({
    data: post,
    meta: res.locals.meta,
  });
});

app.get("/tags", (req, res) => {
  const tags = dataStore.getTags();

  return res.status(200).json(tags);
});

app.listen(port, () => {
  console.log(`
    📞    Blogging API Server listening on port ${port}
    👉    Try http://localhost:${port}/posts
    😴    Simulate slowness: http://localhost:${port}/posts?slow`);
});
