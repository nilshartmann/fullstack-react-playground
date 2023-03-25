import { tagCloud as createTagCloud } from "tag-cloud";
import type { ITags } from "~/blog-api/types";
import { apiUrl } from "~/blog-api/config";
import { delayTagCloud } from "~/blog-api/demo-config";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { TagCloudResponse } from "~/routes/api.tagcloud";
import { useEffect } from "react"; // 4kb lib which is not transferred to server

export default function TagCloud() {
  const tagsFetcher = useFetcher<TagCloudResponse>();
  console.log("tagsFetcher state", tagsFetcher.state);
  useEffect(() => {
    if (tagsFetcher.type === "init") {
      tagsFetcher.load("/api/tagcloud");
    }
  }, [tagsFetcher]);

  if (tagsFetcher.data) {
    console.log("Tags Fetcher Data", tagsFetcher.data);
  }
  const tags: ITags[] = [];
  console.log("TAGS", tags);

  const tc = createTagCloud(
    Object.entries(tags).map((entry) => ({
      tagName: entry[0],
      count: entry[1],
    })),
    (err: any, data: any) => data,
    { numBuckets: 4, classPrefix: "TagCloud--tag-" }
  );

  // if (delay.tagCloud) {
  //   fetch("http://localhost:4001/sleep/3000");
  // }

  return (
    <>
      <h1>Tags</h1>
      <div
        className="TagCloud"
        dangerouslySetInnerHTML={{
          __html: tc,
        }}
      />
    </>
  );
}
