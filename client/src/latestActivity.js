import { useEffect } from "react";
import OtherOffers from "./otherOffers";

export default function LatestActivity() {
    useEffect(() => {
        console.log("latest activity window mounted");
    }, []);

    return (
        <div>
            <h1>Latest Activity Window</h1>
            <OtherOffers />
        </div>
    );
}
