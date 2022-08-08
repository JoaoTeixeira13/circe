import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function LatestOtherOffers() {
    const myWishlist = useSelector((state) => state.wishlist); 
    const [latestPlants, setLatestPlants] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch("/api/latestPlants");
                const data = await resp.json();
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
            <div className="latestPlants">
                {latestPlants.length !== 0 &&
                    latestPlants.map((plant) => {
                        return (
                            <div className="plantCell" key={plant.id}>
                                <img
                                    className="wishlistIcon"
                                    src={plant.image_url || "/default.png"}
                                    alt={plant.display_pid}
                                />
                                <h4>📍 {plant.location}</h4>
                                <h4>
                                    {plant.user} is trading a{" "}
                                    {plant.display_pid}!
                                </h4>
                                {myWishlist.length !== 0 &&
                                    myWishlist.map((each) => {
                                        if (each.pid === plant.pid) {
                                            return (
                                                <h4 key={each.id}>
                                                    <span className="fullMatch">
                                                        You are looking for
                                                        this!
                                                    </span>
                                                </h4>
                                            );
                                        }
                                    })}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
