import { componentLog, timeString } from "@/app/logger";
import AppLink from "@/app/AppLink";
import { OrderBy } from "@/app/articles";

export default function MorePage() {
  const time = timeString();
  componentLog("MorePage", time);

  return (
    <div>
      <p>MorePage. Created: {time}</p>

      <AppLink href={"/02_rsc_partial/sub/detail"}>Back to detail!</AppLink>
    </div>
  );

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
//
//
// export default function DetailPageWithoutSearchParams() {
//   // const searchParams = { orderBy: "asc" } as const;
//   componentLog("DetailPageWithoutSearchParams");
//   return (
//     <div>
//       {" "}
//       <p>DetailPageWithoutSearchParams</p>
//       <AppLink href={"/02_rsc_partial/sub"}>Back to sub!</AppLink>
//     </div>
//   );
//   //
//   // const { orderBy = "asc" } = searchParams;
//   //
//   // const articles = getArticles(orderBy);
//   //
//   // // return (
//   // // 	<div className={"grid grid-cols-3 max-w-lg"}>
//   // // 		<div className={"border-2 col-span-2"}>sssss</div>
//   // // 		<div className={"border-2"}>zwei</div>
//   // // 	</div>
//   // // );
//   //
//   // return <ArticleList articles={articles} currentOrder={orderBy} />;
// }
