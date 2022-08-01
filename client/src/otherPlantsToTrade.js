import { useEffect } from "react";

export default function OtherPlantsToTrade(props) {
    useEffect(() => {
    }, []);

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
