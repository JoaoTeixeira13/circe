import { useState, useEffect } from "react";

export default function ToTrade() {
    useEffect(() => {
        console.log("To Trade component mounted!");
    }, []);
    return (
        <div>
            <h1>To trade Component here! </h1>
        </div>
    );
}
