import { useEffect } from "react";

export default function OtherWishlist(props) {
    useEffect(() => {
    }, []);

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
