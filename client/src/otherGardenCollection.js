
export default function OtherGardenCollection(props) {
    

    const openModal = (plant) => {
        props.setModalWindow(true);
        props.setPlantDisplay(plant);
    };

    return (
        <div>
            <div className="plantList myGarden">
                {props.garden &&
                    props.garden.map((plant) => {
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
