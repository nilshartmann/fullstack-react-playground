import {IResponseMetaData} from "@/types";

export default function MetaFetchData({meta}: {meta: IResponseMetaData}) {
    return <p>Request to {meta.path} id: {meta.requestId} (timeout: {meta.timeout || "none"}, cache-max-age: {meta.cacheMaxAge||"none"})</p>
}