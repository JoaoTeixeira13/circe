import Wishlist from "./wishlist";
import Matches from "./matches";
import ToTrade from "./toTrade";
import TradeUploader from "./tradeUploader";
import WishlistUploader from "./wishlistUploader";
import MatchModal from "./matchModal";

import { useState } from "react";

export default function TradeWindow() {
    const [matchDisplay, setMatchDisplay] = useState("");
    const tradeManager = true;

    return (
        <div className="exploreElement">
            <Wishlist tradeManager={tradeManager} />
            <Matches setMatchDisplay={setMatchDisplay} />
            <ToTrade tradeManager={tradeManager} />
            <WishlistUploader />
            <TradeUploader />
            <MatchModal matchDisplay={matchDisplay} />
        </div>
    );
}
