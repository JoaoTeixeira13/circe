import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "./redux/wishlist/slice";

export default function Wishlist() {
    const wishlist = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Wishlist component mounted!");
    }, []);

    const handleCheckbox = (id) => {
        console.log(
            "user just clicked on check box with following target id: ",
            id
        );
        (async () => {
            try {
                const resp = await fetch("/api/deleteFromWishlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ plant: id }),
                });
                const data = await resp.json();
                console.log("data on back from add wish list button is,", data);

                dispatch(removeFromWishlist(data.plant));
            } catch (err) {
                console.log("error in posting users' relationship ", err);
            }
        })();
    };

    return (
        <div className="wishlist">
            <h1>Wishlist Component here! </h1>

            <div className="plantList">
                {wishlist &&
                    wishlist.map((plant) => {
                        return (
                            <div className="plantCell" key={plant.id}>
                                <input
                                    type="checkbox"
                                    onClick={() => handleCheckbox(plant.pid)}
                                ></input>
                                <h4 onClick={(e) => fetchOnePlant(e)}>
                                    {plant.display_pid}
                                </h4>
                                <img
                                    className="wishlistIcon"
                                    src={plant.image_url}
                                    alt={plant.display_pid}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
