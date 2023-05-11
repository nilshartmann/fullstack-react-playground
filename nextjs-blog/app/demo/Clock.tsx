"use client"
import {useEffect, useState} from "react";
import formatDuration from 'format-duration';
export default function Clock() {

    const [d, setD] = useState<null|string>(null);

    useEffect( () => {
        const start = Date.now();
        const c = setInterval( () => {
            setD(formatDuration(Date.now() - start, {
                ms: true,
                leading: true
            }));
        }, 100);

        return () => clearInterval(c);
        //     setInterval(() => {
        //         const d = new Date();
        //         const s = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}.${String(d.getMilliseconds()).padStart(4, "0")}`
        //         setD(s);
        //     }, 100)

    }, [])

    // useEffect(() => {
    //     setInterval(() => {
    //         const d = new Date();
    //         const s = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}.${String(d.getMilliseconds()).padStart(4, "0")}`
    //         setD(s);
    //     }, 100)
    // })

    return <div>
        <code>{d}</code>
    </div>

}