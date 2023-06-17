import { tagCloud as createTagCloud } from "tag-cloud";
import type { ITags } from "~/types";
import { componentLog } from "~/component-log";

type TagCloudProps = { tags: ITags[] };
export default function TagCloud({ tags }: TagCloudProps) {
  console.log("TAGW", tags);
  componentLog("TagCloud");

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
