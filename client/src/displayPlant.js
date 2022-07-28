import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

export default function DisplayPlant(props) {
    const wishlist = useSelector((state) => state.wishlist);
    const buttonValues = {
        add: "Add to Wishlist",
        remove: "Remove from Wishlist",
    };
    const [button, setButton] = useState(buttonValues.add);

    const handleWishlist = () => {
        console.log(
            "user wants to add to wishlist: ",
            props.plant.display_pid,
            props.plant
        );
    };

    return (
        <div className="singularPlant">
            {props.plant && (
                <>
                    <h1>{props.plant.display_pid}</h1>
                    <img src={props.plant.image_url}></img>
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
                        {props.plant.min_temp} min, {props.plant.max_temp} max.
                    </p>
                    <p>
                        <strong>Soil (moisture): </strong>
                        {props.plant.min_soil_moist} min,{" "}
                        {props.plant.max_soil_moist} max,{" "}
                        <strong>electrical condutivity: </strong>
                        {props.plant.min_soil_ec} min, {props.plant.max_soil_ec}{" "}
                        max.
                    </p>
                    <button onClick={() => handleWishlist()}>{button}</button>
                </>
            )}
        </div>
    );
}
