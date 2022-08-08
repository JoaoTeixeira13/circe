import { useEffect } from "react";
import LatestOtherOffers from "./latestOtherOffers";

export default function LatestActivity() {
    useEffect(() => {
        console.log("latest activity window mounted");
    }, []);

    return (
        <div>
            <h1>Latest Activity Window</h1>
            <LatestOtherOffers />
        </div>
    );
}
