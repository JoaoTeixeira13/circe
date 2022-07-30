import { useState, useEffect } from "react";
import { toggleTradeUploader } from "./redux/toggleTradeUploader/slice";
import { useSelector, useDispatch } from "react-redux";

import ToTradeList from "./toTradeList";

export default function ToTrade() {
    const dispatch = useDispatch();

    const modalWindow = useSelector((state) => state.toggleTradeUploader);

    const uploadPlant = () => {
        dispatch(toggleTradeUploader(!modalWindow));
    };
    useEffect(() => {
        console.log("To Trade component mounted!");
    }, []);

    return (
        <div className="toTrade">
            <h1>What I'm offering</h1>
            <ToTradeList />

            <button onClick={() => uploadPlant()}>Add</button>
        </div>
    );
}
