import {headers} from "next/headers";
import timeString from "@/app/components/time-string";
import formatDuration from "format-duration";

let count = 0;
let lastRender = 0;

function getViewCount() {
    count = count + 1;
    const now = Date.now();
    console.log("getUserPageViewCount new view count", timeString(now), count);
    let duration = lastRender === 0 ? "initial render" :formatDuration(Date.now() - lastRender);
    lastRender = Date.now();
    return `#${count} @ ${timeString(now)} (last rendered before: ${duration})`;
}


async function delay(ms: number): Promise<string> {
    let title = 'Next.js Quarter Zip';
    await new Promise((res) =>
        setTimeout(() => {
            res(title);
        }, ms),
    );
    return title;
}

export const revalidate = 10;

export default async function UserPage() {
    // header => jedes Mal neu rendern, weil die request abhängig sind
    headers();
    const x = getViewCount();
    const user = await delay(1000);
    return <div>
        <h1>User ({x})</h1>
        {user}
    </div>
}