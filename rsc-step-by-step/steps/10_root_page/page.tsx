// Schritt 1:
//   - Artikel lesen und anzeigen (mit latestComment)
//
// Schritt 2:
//  - ThemeSwitcher
//  - Wie kommunizieren wir vom ThemeSwitcher zurück
//    zur Parent RSC-Komponente? 🤔
//
// Schritt 3:
//  - AppLink
//
// Schritt 4:
//  - AddCommentForm

import { fetchArticles } from "@/app/articles";

export default async function RootPage() {
  const articles = await fetchArticles();
  return (
    <>
      <h1>Articles</h1>
      {articles.map((a) => {
        return (
          <article key={a.id} className="Container">
            <h2>{a.title}</h2>
            <p>{a.body}</p>
          </article>
        );
      })}
    </>
  );
}
