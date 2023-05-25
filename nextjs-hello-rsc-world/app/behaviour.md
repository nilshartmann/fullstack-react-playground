# Aufruf: /02_rsc_partial

* Seite ist statisch gerendert, ändert sich nie
* Das gilt auch für RootLayout

# Aufruf: /02_rsc_partial/sub

* Seite wird alle fünf Sekunden neu gerendert
* Weil da `revalidation` drin steht
* Deswegen wird hier auch das Root**Layout** neu gerendert 


# Aufruf /02_rsc_partial/sub/detail

* Alle Layouts und `DetailPages` rendern sich alle 5 Sekunden neu,
* weil in `sub` `revalidate` gesetzt ist
  * wenn in diesem `detail` Layout `revalidate` **kürzer** als in `sub` gesetzt ist, wird diese Zeit genommen
  * wenn in diesem `detail` Layout `revalidate` **länger** als in `sub` gesetzt ist, bleibt es bei der kürzeren Zeit in  `sub`
  *
* Die Unterseite `search` wird hier auch jedesmal neu gefetchted, wg. Pre-Fetch-verhalten über den Link
  * Da `SearchPage` `searchParams` verwendet ist es eine dynamische Seite (!)
* Die Unterseite `more` wird initial einmal ge-pre-fetchted  (wegen des Links)
  * danach nicht mehr, weil static 

# Aufruf 02_rsc_partial/sub/detail/search

* Hier wird jedesmal alles neu gerendert, weil die Komponente das `searchParam`-Property verwendet!
 * Offensichtlich reicht die Verwendungen des `searchParam`-Properties aus (wie auch immer Next.JS das erkennt), denn es wird auch ohne Angabe eines searchPArams die Seite neugerendert
   * Offensichtlich ist das so, denn wenn man den Namen im TypeScript-Typen bzw. beim Destructuren ändert, gibt es einen Compile-Fehler

## Layouts

* Für jede Seite, die (vor) gerendert wird, werden auch alle (Parent-)Layout-Komponenten neu ausgeführt (logisch) 
