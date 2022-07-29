import { useState, useEffect } from "react";
import { toggleTradeUploader } from "./redux/toggleTradeUploader/slice";
import { useSelector, useDispatch } from "react-redux";


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
            <h1>ToTrade Component </h1>
            
            <button onClick={() => uploadPlant()}>Add</button>
        </div>
    );
}
