import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toggleMatchModal } from "./redux/toggleMatchModal/slice";

export default function MatchModal(props) {
    const dispatch = useDispatch();
    const modalWindow = useSelector((state) => state.toggleMatchModal);
    const closeModal = () => {
        dispatch(toggleMatchModal(!modalWindow));
    };

    useEffect(() => {}, []);

    // const uploadPlant = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const resp = await fetch("/uploadPlant", {
    //             method: "POST",
    //             body: new FormData(e.target),
    //         });

    //         const data = await resp.json();

    //         console.log("data is", data);
    //         dispatch(addToPlantsToTrade(data.plant));
    //         closeModal();
    //     } catch (err) {
    //         console.log("error in uploading user's picture ", err);
    //     }
    // };

    return (
        <>
            {modalWindow && (
                <div className="modalWindow matchModal">
                    <img src={props.matchDisplay.user_pic} />
                    <img src={props.matchDisplay.image_url}></img>
                    <div className="matchInfo">
                        <h2>
                            {" "}
                            {props.matchDisplay.first} has a{" "}
                            {props.matchDisplay.display_pid} you are looking
                            for.
                        </h2>
                        <h3>Description: {props.matchDisplay.description}</h3>
                        <button>Contact details</button>
                        <h2 onClick={() => closeModal()} className="closeModal">
                            X
                        </h2>
                    </div>
                </div>
            )}
        </>
    );
}
