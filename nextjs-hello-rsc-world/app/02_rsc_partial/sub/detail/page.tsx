import { componentLog } from "@/app/logger";
import AppLink from "@/app/AppLink";

export default function DetailPageWithoutSearchParams() {
  componentLog("DetailPageWithoutSearchParams");
  return (
    <div>
      {" "}
      <p>DetailPageWithoutSearchParams</p>
      <ul className={"p-4"}>
        <li>
          <AppLink href={"/02_rsc_partial/sub/detail/more"}>
            More (static)!
          </AppLink>
        </li>
        <li>
          <AppLink href={"/02_rsc_partial/sub/detail/search"}>
            Search without search param!
          </AppLink>
        </li>
        <li>
          <AppLink href={"/02_rsc_partial/sub/detail/search?orderBy=asc"}>
            Search order by asc
          </AppLink>
        </li>
        <li>
          <AppLink href={"/02_rsc_partial/sub"}>Back to sub!</AppLink>
        </li>
      </ul>
    </div>
  );
  //
  // const { orderBy = "asc" } = searchParams;
  //
  // const articles = getArticles(orderBy);
  //
  // // return (
  // // 	<div className={"grid grid-cols-3 max-w-lg"}>
  // // 		<div className={"border-2 col-span-2"}>sssss</div>
  // // 		<div className={"border-2"}>zwei</div>
  // // 	</div>
  // // );
  //
  // return <ArticleList articles={articles} currentOrder={orderBy} />;
}
