import { useSelector } from "react-redux";

export default function MyGardenCollection(props) {
    const myGarden = useSelector((state) => state.myGarden);
    const openModal = (plant) => {
        props.setModalWindow(true);
        props.setPlantDisplay(plant);
    };

    return (
        <div>
            <div className="plantList myGarden">
                {myGarden &&
                    myGarden.map((plant) => {
                        return (
                            <img
                                onClick={() => openModal(plant)}
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
