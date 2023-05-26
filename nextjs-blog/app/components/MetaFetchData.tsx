import { IResponseMetaData } from "@/types";
import { timeString } from "@/app/components/date-formatter";
import { enableMetadataView } from "@/app/demo-config";

export default function MetaFetchData({
  meta,
  children,
}: {
  meta: IResponseMetaData;
  children?: React.ReactNode;
}) {
  if (!enableMetadataView) {
    return <>{children}</>;
  }

  const sentAt = meta.sentAt ? `sent at ${timeString(meta.sentAt)} and` : "";

  return (
    <div className={"MetaFetchData"}>
      Request to <code>{meta.path}</code> id: {meta.requestId}, {sentAt}{" "}
      rendered at: {timeString()}
      {!!meta.timeout && ` (paused ${meta.timeout}ms)`}
      {children}
    </div>
  );
}
