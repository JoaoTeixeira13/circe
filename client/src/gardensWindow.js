import { useState } from "react";

import Gardens from "./gardens";
import GardensModal from "./gardensModal";

export default function GardensWindow() {
    const [plantDisplay, setPlantDisplay] = useState("");
    const [modalWindow, setModalWindow] = useState(false);

    return (
        <div>
            
            <Gardens
                setModalWindow={setModalWindow}
                setPlantDisplay={setPlantDisplay}
            />
            <GardensModal
                modalWindow={modalWindow}
                setModalWindow={setModalWindow}
                plantDisplay={plantDisplay}
            />
        </div>
    );
}
