import timeString from "@/app/components/time-string";
import Clock from "@/app/demo/Clock";
import formatDuration from "format-duration";

console.log("initialize demo/page", timeString());

let count = 0;
let lastRender = 0;

function getViewCount() {
    count = count + 1;
    const now = Date.now();
    console.log("getDemoPageViewCount new view count", timeString(now), count);
    let duration = lastRender === 0 ? "initial render" :formatDuration(Date.now() - lastRender);
    lastRender = Date.now();
    return `#${count} @ ${timeString(now)} (last rendered before: ${duration})`;
}

export const revalidate = 5;

export default function DemoPage() {
    const vc = getViewCount();
    return <div>
        <h1>Demo</h1>

        <p>View Count {vc}</p>
        <Clock />
    </div>
}