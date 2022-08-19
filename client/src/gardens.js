import { useState } from "react";
import { useEffect } from "react";

export default function Gardens(props) {
    const [plants, setPlants] = useState([]);

    const openModal = (plant) => {
        props.setModalWindow(true);
        props.setPlantDisplay(plant);
    };

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch("/api/fetchGardens");
                const data = await resp.json();

                if (data.success) {
                    setPlants(data.plants);
                }
            } catch (err) {
                console.log("error in fetching  logged user ", err);
            }
        })();
    }, []);

    return (
        <div className="gardens">
            {plants.length !== 0 &&
                plants.map((plant) => {
                    return (
                        <div className="gardenCell" key={plant.id}>
                            <div className="userInfo">
                                <img
                                    src={plant.user_pic}
                                    className="userIcon"
                                />
                                <h4>
                                    {plant.first} {plant.last}
                                </h4>
                            </div>
                            <img
                                src={plant.image_url}
                                className="gardensPlant"
                                onClick={() => openModal(plant)}
                            />
                        </div>
                    );
                })}
        </div>
    );
}
