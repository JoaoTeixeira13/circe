import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./404notFound";

export default function LatestOtherOffers() {
    const myWishlist = useSelector((state) => state.wishlist);
    const [latestPlants, setLatestPlants] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        (async () => {
            let abort = false;

            if (!abort) {
                try {
                    const resp = await fetch(
                        `/api/latestPlants?plantSearch=${searchInput}`
                    );
                    const data = await resp.json();

                    if (data.success) {
                        setLatestPlants(data.plants);
                    }
                } catch (err) {
                    console.log("error in fetching newest plants ", err);
                }
            }
            return () => {
                console.log("cleanup running");
                abort = true;
            };
        })();
    }, [searchInput]);

    return (
        <div className="searchContainer">
            <div className="searchInfo">
                {(!searchInput && <h2>Latest plants!</h2>) ||
                    (searchInput && <h2>Search results for {searchInput}:</h2>)}
                <div>
                    <h3>Looking for a specific plant?</h3>
                    <input
                        onChange={(e) => setSearchInput(e.target.value)}
                        name="plantSearch"
                        type="text"
                        placeholder="ex: Monstera friedrichsthalii"
                        value={searchInput}
                    />
                </div>
            </div>
            <div className="latestPlants">
                {latestPlants.length !== 0 &&
                    latestPlants.map((plant) => {
                        return (
                            <div className="plantCell" key={plant.id}>
                                <Link to={`user/${plant.user_id}`}>
                                    <img
                                        className="wishlistIcon"
                                        src={plant.image_url || "/default.png"}
                                        alt={plant.display_pid}
                                    />
                                </Link>

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
                {latestPlants.length === 0 && searchInput && (
                    <div className="notFoundContainer">
                        <NotFound />
                        <h2> Plant not found. </h2>
                    </div>
                )}
            </div>
        </div>
    );
}
