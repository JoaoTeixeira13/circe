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
            {latestPlants &&
                latestPlants.map((plant) => {
                    return (
                        <div className="plantCell" key={plant.id}>
                            <h4>{plant.location}</h4>
                            <img
                                className="wishlistIcon"
                                src={plant.image_url}
                                alt={plant.display_pid}
                            />
                            <h4>
                                {plant.user} is trading a {plant.display_pid}!
                            </h4>
                        </div>
                    );
                })}
        </div>
    );
}
