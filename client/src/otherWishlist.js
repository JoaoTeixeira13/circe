import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function OtherWishlist(props) {
    const myOffers = useSelector((state) => state.plantsToTrade);

    useEffect(() => {}, []);

    return (
        <div className="wishlist">
            <h1>Wishlist</h1>

            <div className="plantList">
                {props.userWishlist &&
                    props.userWishlist.map((plant) => {
                        return (
                            <div className="plantCell" key={plant.id}>
                                <div className="wishlistCheck">
                                    <h4>{plant.display_pid}</h4>
                                </div>

                                {myOffers.length !== 0 &&
                                    myOffers.map((each) => {
                                        if (each.pid === plant.pid) {
                                            return (
                                                <h4 key={each.id}>
                                                    You have this to trade.
                                                </h4>
                                            );
                                        }
                                    })}

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
