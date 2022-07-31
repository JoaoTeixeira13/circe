import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toggleMatchModal } from "./redux/toggleMatchModal/slice";

export default function MatchModal() {
    const dispatch = useDispatch();
    const modalWindow = useSelector((state) => state.toggleMatchModal);
    const closeModal = () => {
        dispatch(toggleMatchModal(!modalWindow));
    };

    useEffect(() => {
        console.log("Match Modal component just mounted!");
    }, []);

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
                <div className="modalWindow">
                    <h2> They have something you want, reach out to them!</h2>
                    <button>Submit</button>
                    <h2 onClick={() => closeModal()} className="closeModal">
                        X
                    </h2>
                </div>
            )}
        </>
    );
}
