import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { addToWishlist, removeFromWishlist } from "./redux/wishlist/slice";
import { addToMatches, removeFromMatches } from "./redux/matches/slice";

export default function DisplayPlant(props) {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);

    const buttonValues = {
        add: "Add to Wishlist",
        remove: "Remove from Wishlist",
    };
    const [button, setButton] = useState(buttonValues.add);

    useEffect(() => {
        {
            if (wishlist) {
                for (let i = 0; i < wishlist.length; i++) {
                    let plant = wishlist[i];

                    if (plant.pid == props.plant.pid) {
                        setButton(buttonValues.remove);
                        return true;
                    }
                }
                setButton(buttonValues.add);
            }
        }
    }, [props.plant]);

    const handleWishlist = () => {
        (async () => {
            try {
                const resp = await fetch("/api/handleWishlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify([{ button }, { plant: props.plant }]),
                });
                const data = await resp.json();

                if (button == buttonValues.add) {
                    dispatch(addToWishlist(data.plant));
                    dispatch(addToMatches(data.plant));
                } else if (button == buttonValues.remove) {
                    dispatch(removeFromWishlist(data.plant));
                    dispatch(removeFromMatches(data.plant));
                }
                setButton(data.buttonText);
            } catch (err) {
                console.log("error in posting users' relationship ", err);
            }
        })();
    };

    return (
        <div className="singularPlant">
            {(props.plant && (
                <div className="singularPlantDisplay">
                    <div>
                        <h1>{props.plant.display_pid}</h1>
                        <img src={props.plant.image_url}></img>
                    </div>

                    <div className="singularPlantInfo">
                        <p>
                            <strong>Light (lux units): </strong>
                            {props.plant.min_light_lux} min,{" "}
                            {props.plant.max_light_lux} max.
                        </p>
                        <p>
                            <strong>Humidity (%): </strong>
                            {props.plant.min_env_humid} min,{" "}
                            {props.plant.max_env_humid} max.
                        </p>
                        <p>
                            <strong>Temperature (celcius): </strong>
                            {props.plant.min_temp} min, {props.plant.max_temp}{" "}
                            max.
                        </p>
                        <p>
                            <strong>Soil (moisture): </strong>
                            {props.plant.min_soil_moist} min,{" "}
                            {props.plant.max_soil_moist} max,{" "}
                            <strong>electrical condutivity: </strong>
                            {props.plant.min_soil_ec} min,{" "}
                            {props.plant.max_soil_ec} max.
                        </p>
                        <button onClick={() => handleWishlist()}>
                            {button}
                        </button>
                    </div>
                </div>
            )) || (
                <div className="noSingularPlant">
                    <h1>Discover a world of botanical curiosities. </h1>
                </div>
            )}
        </div>
    );
}
