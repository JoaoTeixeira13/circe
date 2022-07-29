import { useState, useEffect } from "react";

export default function Matches() {
    useEffect(() => {
        console.log("Matches component mounted!");
    }, []);
    return (
        <div>
            <h1>Matches Component here! </h1>
        </div>
    );
}
