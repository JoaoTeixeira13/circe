import { useEffect, useState } from "react";

export default function OtherOffers() {
    const [latestPlants, setLatestPlants] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch("/api/latestPlants");
                const data = await resp.json();
                console.log("received data from server is, ", data);
                if (data.success) {
                    setLatestPlants(data.plants);
                }
            } catch (err) {
                console.log("error in fetching newest plants ", err);
            }
        })();
    }, []);

    return (
        <div>
            <h2>Other offers go here.</h2>
        </div>
    );
}
