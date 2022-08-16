import { useSelector } from "react-redux";

export default function MyGardenCollection() {
    const myGarden = useSelector((state) => state.myGarden);


    return (
        <div>
            <div className="plantList myGarden">
                {myGarden &&
                    myGarden.map((plant) => {
                        return (
                            <img
                                key={plant.id}
                                src={plant.image_url}
                                alt={plant.pid}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
