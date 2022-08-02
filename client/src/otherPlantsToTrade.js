import { useSelector } from "react-redux";

export default function OtherPlantsToTrade(props) {
    const myWishlist = useSelector((state) => state.wishlist);

    return (
        <div
            className={`plantsToTrade${
                props.tradeProfile ? " tradeCell" : ""
            } toTrade`}
        >
            <h1>Trading</h1>

            <div className="plantList">
                {props.userPlants &&
                    props.userPlants.map((plant) => {
                        return (
                            <div
                                className={`plantCell${
                                    props.tradeProfile ? " tradeCell" : ""
                                }`}
                                key={plant.id}
                            >
                                <div className="wishlistCheck">
                                    <h4>{plant.display_pid}</h4>
                                </div>

                                {myWishlist.length !== 0 &&
                                    myWishlist.map((each) => {
                                        if (each.pid === plant.pid) {
                                            return (
                                                <h4 key={each.id}>
                                                    <span className="fullMatch">
                                                        You are looking for
                                                        this!
                                                    </span>
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
