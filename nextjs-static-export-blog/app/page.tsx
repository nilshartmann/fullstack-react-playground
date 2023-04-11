import Link from "next/link";

export default function Home() {
  return (
      <div>
      <h1>Home</h1>
          <ul>
              <li><Link href={"/blog"}>Blog</Link></li>
              <li><Link href={"/hello"}>Hello</Link></li>
          </ul>
      </div>
  )
}
