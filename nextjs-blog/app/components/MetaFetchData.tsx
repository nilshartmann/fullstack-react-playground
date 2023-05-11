import { IResponseMetaData } from "@/types";
import { timeString } from "@/app/components/date-formatter";

export default function MetaFetchData({
  meta,
  children,
}: {
  meta: IResponseMetaData;
  children?: React.ReactNode;
}) {
  const sentAt = meta.sentAt ? `sent at ${timeString(meta.sentAt)} and` : "";

  return (
    <div className={"MetaFetchData"}>
      Request to <code>{meta.path}</code> id: {meta.requestId}, {sentAt}{" "}
      received at: {timeString(meta.receivedAt)}
      {!!meta.timeout && ` (paused ${meta.timeout}ms)`}
      {children}
    </div>
  );
}
