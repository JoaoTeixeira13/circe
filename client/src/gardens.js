import { useState } from "react";
import { useEffect } from "react";

export default function Gardens() {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        console.log("gardens component just mounted!");

        (async () => {
            try {
                const resp = await fetch("/api/fetchGardens");
                const data = await resp.json();
                console.log("plants in data are , ", data.plants);
                if (data.sucess) {
                    setPlants(data.plants);
                }
            } catch (err) {
                console.log("error in fetching  logged user ", err);
            }
        })();
    }, []);

    return (
        <div>
            <h1>
                Here all the plants in the users' collections you follow will be
                displayed.
            </h1>
        </div>
    );
}
