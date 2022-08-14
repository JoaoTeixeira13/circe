import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeFromPlantsToTrade } from "./redux/plantsToTrade/slice";

export default function ToTradeList(props) {
    const dispatch = useDispatch();
    const plantsToTrade = useSelector((state) => state.plantsToTrade);

    const containerRef = useRef();

    useEffect(() => {
        containerRef.current.scrollTop =
            containerRef.current.scrollHeight -
            containerRef.current.clientHeight;
    }, [plantsToTrade]);

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
        <div
            className={`plantsToTrade${props.tradeProfile ? " tradeCell" : ""}`}
        >
            <div className="plantList" ref={containerRef}>
                {plantsToTrade &&
                    plantsToTrade.map((plant) => {
                        return (
                            <div
                                className={`plantCell${
                                    props.tradeProfile ? " tradeCell" : ""
                                }`}
                                key={plant.id}
                            >
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
