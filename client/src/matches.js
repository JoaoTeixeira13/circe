import { useState, useEffect } from "react";

export default function Matches() {
    useEffect(() => {
        console.log("Matches component mounted!");
    }, []);
    return (
        <div className="matches">
            <h1>Matches Component </h1>
        </div>
    );
}