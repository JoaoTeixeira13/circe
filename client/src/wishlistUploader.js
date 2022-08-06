import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "./redux/wishlist/slice";
import { toggleWishlistModal } from "./redux/toggleWishlistUploader/slice";

export default function WishlistUploader() {
    const [input, setInput] = useState({});
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const modalWindow = useSelector((state) => state.toggleWishlistModal);

    const closeModal = () => {
        dispatch(toggleWishlistModal(!modalWindow));
        setError(false);
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitToWishlist = async () => {
        try {
            const resp = await fetch("/api/addToWishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ plant: input }),
            });
            const data = await resp.json();

            if (data.success) {
                dispatch(addToWishlist(data.plant));
                setError(false);
                dispatch(toggleWishlistModal(!modalWindow));
            } else {
                setError(true);
            }
        } catch (err) {
            console.log("error in posting users' relationship ", err);
        }
    };

    return (
        <>
            {modalWindow && (
                <div className="tradeWishlistUploader modalWindow">
                    <h2> Add plant to your wishlist</h2>

                    {error && <p>Please provide a valid input.</p>}
                    <input
                        type="text"
                        name="plant_id"
                        placeholder="nomenclature(ex:Scindapsus pictus)*"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    <input
                        type="text"
                        name="image_url"
                        placeholder="image url (optional)"
                        onChange={(e) => handleChange(e)}
                    />
                    <button onClick={() => submitToWishlist()}>Add</button>
                    <h2 onClick={() => closeModal()} className="closeModal">
                        X
                    </h2>
                </div>
            )}
        </>
    );
}
