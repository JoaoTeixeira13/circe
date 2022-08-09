import { useEffect } from "react";
import LatestOtherOffers from "./latestOtherOffers";

export default function LatestActivity() {
    useEffect(() => {
        console.log("latest activity window mounted");
    }, []);

    return (
        <div>
            <LatestOtherOffers />
        </div>
    );
}
