import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function OtherPlantsToTrade(props) {
    const myWishlist = useSelector((state) => state.wishlist);
    useEffect(() => {}, []);

    return (
        <div className="wishlist">
            <h1>Trading</h1>

            <div className="plantList">
                {props.userPlants &&
                    props.userPlants.map((plant) => {
                        return (
                            <div className="plantCell" key={plant.id}>
                                <div className="wishlistCheck">
                                    <h4>{plant.display_pid}</h4>
                                </div>

                                {myWishlist.length !== 0 &&
                                    myWishlist.map((each) => {
                                        if (each.pid === plant.pid) {
                                            return (
                                                <h4 key={each.id}>
                                                    You are looking for this!
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
