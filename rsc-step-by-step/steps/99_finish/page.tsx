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
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import AppLink from "@/app/components/AppLink";
import { AddCommentForm } from "@/app/components/AddCommentForm";

export default async function RootPage() {
  const articles = await fetchArticles();
  return (
    <>
      <h1>Articles</h1>
      {articles.map((a) => {
        return (
          <ThemeSwitcher key={a.id}>
            <article className="Container">
              <AppLink href={`/${a.id}`}>
                <h2>{a.title}</h2>
              </AppLink>
              <p>{a.body}</p>
              <p>
                <b>Latest Comment</b>
              </p>
              <p>{a.latestComment}</p>
              <AddCommentForm articleId={a.id} />
            </article>
          </ThemeSwitcher>
        );
      })}
    </>
  );
}
