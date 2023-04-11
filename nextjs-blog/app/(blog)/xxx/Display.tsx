import * as fs from 'fs';

function readDemoContent() {
    try {
        const data: string = fs.readFileSync('/Users/nils/develop/javascript/serverside-react-playground/nextjs-blog/demo/b.txt', 'utf8');
        return `${Date.now()}${data}`;
    } catch (err) {
        console.error(err);
    }}

export default function Display({what}: {what: string}) {
    const d = readDemoContent();
    return <div>
        <h1>Display</h1>
        <div>
            <p>Demo Content in Display:</p>
            <code>{d}</code>
        </div>
        <p>What: {what}</p>
    </div>
}