import ExplorePlants from "./explorePlants";
import DisplayPlant from "./displayPlant";
import { useState } from "react";

export default function ExploreWindow() {
    const [plant, setPlant] = useState("");

    return (
        <div className="exploreElement">
            <ExplorePlants setPlant={setPlant} />
            <DisplayPlant plant={plant} />
        </div>
    );
}
