"use client";

import {useState} from "react";

// hier funktioniert die "richtige" Display-Komponente nicht:
//   -> denn sie wird hier als Client Komponente verwendet, und kann nicht auf 'fs' zugreifen
//   -> immerhin gibt es einen Compile-Fehler

const Display = (p:any) => {
    return <h1>dummy</h1>
}
export default function Subpage() {

    const [x, setX] = useState("a")

    return <div>
        <h2>Subpage</h2>
        <button onClick={() => setX(x === "a" ? "b": "a")}>Toggle</button>
        <div>
            <Display what={x} />
        </div>
    </div>
}