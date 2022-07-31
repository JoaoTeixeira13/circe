import Wishlist from "./wishlist";
import Matches from "./matches";
import ToTrade from "./toTrade";
import TradeUploader from "./tradeUploader";
import MatchModal from "./matchModal";

import { useState } from "react";

export default function TradeWindow() {
    const [matchDisplay, setMatchDisplay] = useState("");

    return (
        <div className="exploreElement">
            <Wishlist />
            <Matches setMatchDisplay={setMatchDisplay} />
            <ToTrade />
            <TradeUploader />
            <MatchModal matchDisplay={matchDisplay} />
        </div>
    );
}
