type BlogPost = {
    id: string;
    title: string;
}

export default async function BlogPage() {

    const response = await fetch("http://localhost:7000/posts",{
     // cache: 'no-store'
    });
    const posts: {data: BlogPost[] } = await response.json();

    return <div>
        <h1>Blog Page</h1>

        <ul>
        {posts.data.map(r => {
            return <li key={r.id}>{r.title}</li>
        })}
        </ul>

    </div>

}