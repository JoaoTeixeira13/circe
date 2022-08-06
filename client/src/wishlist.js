import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "./redux/wishlist/slice";
import { toggleWishlistModal } from "./redux/toggleWishlistUploader/slice";

export default function Wishlist(props) {
    const wishlist = useSelector((state) => state.wishlist);
    const modalWindow = useSelector((state) => state.toggleWishlistModal);

    const dispatch = useDispatch();

    const handleCheckbox = async (id) => {
        try {
            const resp = await fetch("/api/deleteFromWishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ plant: id }),
            });
            const data = await resp.json();

            dispatch(removeFromWishlist(data.plant));
        } catch (err) {
            console.log("error in posting users' relationship ", err);
        }
    };

    const handleModal = () => {
        dispatch(toggleWishlistModal(!modalWindow));
    };

    return (
        <div className="wishlist">
            <h1>Wishlist</h1>

            <div className="plantList">
                {wishlist &&
                    wishlist.map((plant) => {
                        return (
                            <div className="plantCell" key={plant.id}>
                                <div className="wishlistCheck">
                                    {props.tradeManager && (
                                        <input
                                            type="checkbox"
                                            onClick={() =>
                                                handleCheckbox(plant.pid)
                                            }
                                        />
                                    )}

                                    <h4>{plant.display_pid}</h4>
                                </div>

                                {props.tradeManager && (
                                    <img
                                        className="wishlistIcon"
                                        src={plant.image_url || "/default.png"}
                                        alt={plant.display_pid}
                                    />
                                )}
                            </div>
                        );
                    })}
            </div>
            {props.tradeManager && (
                <button onClick={() => handleModal()}>Add</button>
            )}
        </div>
    );
}
