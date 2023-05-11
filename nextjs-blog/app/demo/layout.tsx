import timeString from "@/app/components/time-string";
import formatDuration from 'format-duration';

let count = 0;
let lastRender = 0;



function getViewCount() {
    count = count + 1;
    console.log("getLayoutCount new view count", count);
    let duration = lastRender === 0 ? "initial render" :formatDuration(Date.now() - lastRender);
    lastRender = Date.now();
    return `#${count} @ ${timeString()} (last rendered before: ${duration})`;
}

export default function DemoLayout({children}: {children: React.ReactNode}) {

    const c = getViewCount();

    return <div>
        <h1>Demo Layout {c}</h1>
        {children}
    </div>

}