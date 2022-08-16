import { useEffect } from "react";

import MyGardenNav from "./myGardenNav";
import MyGardenCollection from "./myGardenCollection";
import MyGardenUploader from "./myGardenUploader";

export default function MyGarden() {
    useEffect(() => {
    }, []);

    return (
        <div className="garden">
            <MyGardenNav />
            <hr className="breakBar" />
            <MyGardenCollection />
            <MyGardenUploader />
        </div>
    );
}
