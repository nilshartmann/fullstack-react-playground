import timeString from "@/app/components/time-string";
import {headers} from "next/headers";

let count = 0;
function getKlimaViewCount() {
    count++;
    console.log("getKlimaViewCount new view count", count);
    return String(count) + " @ " + timeString();
}
export default function KlimaDemoPage() {

    const myHeaders = headers();

    const vc = getKlimaViewCount();
    return <div>
        <h1>Klima Demo</h1>
        <p>View Count {vc}</p>
        <p>
            <code>{JSON.stringify(myHeaders, undefined, 2)}</code>
        </p>
    </div>
}