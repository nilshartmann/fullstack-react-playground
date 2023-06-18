import type { ICommentResponse } from "~/types";
import { componentLog } from "~/component-log";
import MetaFetchData from "~/components/MetaFetchData";
import { Await } from "@remix-run/react";

type PostCommentsProps = {
  commentsResponse: Promise<ICommentResponse>;
};

export default function PostComments({ commentsResponse }: PostCommentsProps) {
  componentLog("PostComments");

  return (
    <Await resolve={commentsResponse}>
      {({ meta, data }) => {
        return (
          <MetaFetchData meta={meta}>
            <div className={"Container"}>
              <h1>Comments</h1>
              {data.map((comment) => (
                <p key={comment.id}>{comment.comment}</p>
              ))}
            </div>
          </MetaFetchData>
        );
      }}
    </Await>
  );
}
