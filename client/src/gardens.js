import { useState } from "react";
import { useEffect } from "react";

export default function Gardens(props) {
    const [plants, setPlants] = useState([]);
    const [moreButton, setMoreButton] = useState(false);

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

    useEffect(() => {
        if (plants.length) {
            const lowestImg = plants[plants.length - 1];
            if (lowestImg.id === lowestImg.lowestId) {
                setMoreButton(false);
            } else {
                setMoreButton(true);
            }
        }
    }, [plants]);

    const openModal = (plant) => {
        props.setModalWindow(true);
        props.setPlantDisplay(plant);
    };

    const getMoreImages = async () => {
        let lowerId = plants[plants.length - 1].id;

        try {
            const resp = await fetch(`/api/fetchMoreImages/${lowerId}`);
            const data = await resp.json();

            if (data.success) {
                setPlants((current) => [...current, ...data.plants]);
            }
        } catch (err) {
            console.log("error in fetching more images ", err);
        }
    };

    return (
        <div className="gardenWindow">
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
            {moreButton && <button id="gardensButton" onClick={() => getMoreImages()}>+</button>}
        </div>
    );
}
