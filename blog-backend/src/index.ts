import express, { Express, Request, Response } from 'express';
import createDataStore, {orderByDateNewestFirst, orderByDateOldestFirst} from "./datastore";

const port = process.env.PORT || 7000;
const slowEnabled = process.env.USE_SLOW === "true";

const dataStore = createDataStore();
const app: Express = express();

// turn off etag for better reproducability in examples / demos
app.set('etag', false);
app.use(express.json());

app.use((req, _res, next) => {
	if (req.query.slow !== undefined || slowEnabled) {
		const timeout = 1200;
		console.log(`Slow down ${timeout}ms`);
		setTimeout(next, timeout);
	} else {
		next();
	}
});

app.get('/', (req: Request, res: Response) => {
	res.send('Blog Post API Backend');
});

app.get('/posts', (req: Request, res: Response) => {
	const orderBy = req.query["order_by"];
	const order = orderBy === "date_asc" ? orderByDateOldestFirst : orderByDateNewestFirst
	res.json(dataStore.getAllPosts(order)
	);
});

// Return Post with specified id (or 404)
app.get("/posts/:id", (req, res) => {
	const post = dataStore.getPost(req.params.id);

	if (!post) {
		return res.status(404).json({ error: `Post '${req.params.id}' not found` });
	}

	return res.status(200).json(post);
});

// Return all comments for post or empty array (or 404 if posts not found)
app.get("/posts/:id/comments", (req, res) => {
	const post = dataStore.getPostComments(req.params.id);

	if (!post) {
		return res.status(404).json({ error: `Post '${req.params.id}' not found` });
	}

	return res.status(200).json(post);
});


app.listen(port, () => {
	console.log(`
    📞    Blogging API Server listening on port ${port}
    👉    Try http://localhost:${port}/posts
    😴    Simulate slowness: http://localhost:${port}/posts?slow`);
});