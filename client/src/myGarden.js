import { useEffect } from "react";

export default function MyGarden() {
    useEffect(() => {
        console.log("my garden component just mounted");
    }, []);

    return (
        <div>
            <h1>Your Garden</h1>
        </div>
    );
}
