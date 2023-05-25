import { ITags } from "@/types";
import { tagCloud as createTagCloud } from "tag-cloud"; // 4kb lib which is not transferred to server
import { apiUrl } from "@/app/config";
import { blogFetch } from "@/app/blog-fetch";
import { componentLog } from "@/app/component-log";

async function fetchTagCloud(): Promise<ITags> {
  const response = await blogFetch(apiUrl("/tags", {}));
  const posts = await response.json();

  return posts;
}

export default async function TagCloud() {
  componentLog("TagCloud");
  const tags = await fetchTagCloud();

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
