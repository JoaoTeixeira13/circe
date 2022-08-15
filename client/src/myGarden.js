import { useEffect } from "react";

import MyGardenNav from "./myGardenNav";

export default function MyGarden() {
    useEffect(() => {
        console.log("my garden component just mounted");
    }, []);

    return (
        <div className="garden">
            <MyGardenNav />
            <hr className="breakBar" />
        </div>
    );
}
