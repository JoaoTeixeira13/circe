import { useState } from "react";

import OtherGardenNav from "./otherGardenNav";
import OtherGardenCollection from "./otherGardenCollection";
import OtherGardenModal from "./otherGardenModal";

export default function OtherGarden(props) {
    const [plantDisplay, setPlantDisplay] = useState("");
    const [modalWindow, setModalWindow] = useState(false);

    return (
        <div className="garden">
            <OtherGardenNav
                garden={props.garden}
                followers={props.followers}
                following={props.following}
                otherUser={props.otherUser}
            />
            <hr className="breakBar" />
            <OtherGardenCollection
                setModalWindow={setModalWindow}
                setPlantDisplay={setPlantDisplay}
                garden={props.garden}
            />
            <OtherGardenModal
                modalWindow={modalWindow}
                setModalWindow={setModalWindow}
                plantDisplay={plantDisplay}
            />
        </div>
    );
}
