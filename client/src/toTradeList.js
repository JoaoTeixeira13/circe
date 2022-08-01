import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { removeFromPlantsToTrade } from "./redux/plantsToTrade/slice";

export default function ToTradeList(props) {
    console.log("props inside to trade list are,", props);
    const dispatch = useDispatch();
    const plantsToTrade = useSelector((state) => state.plantsToTrade);

    useEffect(() => {
        console.log("toTradeList just mounted!");
    }, []);

    const handleCheckbox = async (id) => {
        try {
            const resp = await fetch("/api/deleteFromTradeList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ plant: id }),
            });
            const data = await resp.json();

            dispatch(removeFromPlantsToTrade(data.plant));
        } catch (err) {
            console.log("error in posting users' relationship ", err);
        }
    };

    return (
        <div className="PlantsToTrade">
            <div className="plantList">
                {plantsToTrade &&
                    plantsToTrade.map((plant) => {
                        return (
                            <div className="plantCell" key={plant.id}>
                                <div className="wishlistCheck">
                                    {props.checkbox && (
                                        <input
                                            type="checkbox"
                                            onClick={() =>
                                                handleCheckbox(plant.pid)
                                            }
                                        ></input>
                                    )}

                                    <h4>{plant.display_pid}</h4>
                                </div>
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
