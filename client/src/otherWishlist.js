import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function OtherWishlist(props) {
    const myOffers = useSelector((state) => state.plantsToTrade);

    const containerRef = useRef();

    useEffect(() => {
        containerRef.current.scrollTop =
            containerRef.current.scrollHeight -
            containerRef.current.clientHeight;
    }, [props.userWishlist]);

    return (
        <div className="wishlist">
            <h1>Wishlist</h1>

            <div className="plantList" ref={containerRef}>
                {props.userWishlist &&
                    props.userWishlist.map((plant) => {
                        return (
                            <div
                                className="plantCell otherWishlist"
                                key={plant.id}
                            >
                                <div className="wishlistCheck">
                                    <h4>{plant.display_pid}</h4>
                                    {myOffers.length !== 0 &&
                                        myOffers.map((each) => {
                                            if (each.pid === plant.pid) {
                                                return (
                                                    <h4
                                                        className="fullMatch"
                                                        key={each.id}
                                                    >
                                                        You have this!
                                                    </h4>
                                                );
                                            }
                                        })}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
