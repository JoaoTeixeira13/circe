import { useState } from "react";

import MyGardenNav from "./myGardenNav";
import MyGardenCollection from "./myGardenCollection";
import MyGardenUploader from "./myGardenUploader";
import MyGardenModal from "./myGardenModal";

export default function MyGarden() {
    const [plantDisplay, setPlantDisplay] = useState("");
    const [modalWindow, setModalWindow] = useState(false);

    return (
        <div className="garden">
            <MyGardenNav />
            <hr className="breakBar" />
            <MyGardenCollection
                setModalWindow={setModalWindow}
                setPlantDisplay={setPlantDisplay}
            />
            <MyGardenUploader />
            <MyGardenModal
                modalWindow={modalWindow}
                setModalWindow={setModalWindow}
                plantDisplay={plantDisplay}
            />
        </div>
    );
}
