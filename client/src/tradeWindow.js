import Wishlist from "./wishlist";
import Matches from "./matches";
import ToTrade from "./toTrade";

import { useState } from "react";

export default function TradeWindow() {
    const [match, setMatch] = useState("");

    return (
        <div className="exploreElement">
            <Wishlist setMatch={setMatch} />
            <Matches match={match} />
            <ToTrade />
        </div>
    );
}
