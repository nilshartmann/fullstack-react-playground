import Subpage from "@/app/(blog)/xxx/Subpage";
import * as fs from 'fs';
import Display from "@/app/(blog)/xxx/Display";



function readDemoContent() {
    try {
        const data: string = fs.readFileSync('/Users/nils/develop/javascript/serverside-react-playground/nextjs-blog/demo/a.txt', 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }}

export default function xxxPage() {
    const d = readDemoContent();
    return <div>
        <h1>Hello XXX </h1>
        <Display what={"hurra"} />

        <div>
            <code>{d}</code>
        </div>

        <Subpage />
    </div>
}