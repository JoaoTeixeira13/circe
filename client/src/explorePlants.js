import { useState, useEffect } from "react";

export default function ExplorePlants() {
    const [input, setInput] = useState("");
    const [plantSearch, setPlantSearch] = useState([]);
    const [plant, setPlant] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            let abort = false;
            if (input && !abort) {
                try {
                    const resp = await fetch("/api/plantSearch", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ input }),
                    });
                    const data = await resp.json();

                    if (data.success) {
                        setPlantSearch(data.plantSearch);
                        setError(false);
                    } else {
                        console.log(
                            "something went wrong while fetching the data"
                        );
                        setError(true);
                    }
                } catch (err) {
                    console.log("error in plant search ", err);
                    setError(true);
                }
            }
            return () => {
                abort = true;
            };
        })();
    }, [input]);

    const handleChange = (e) => {
        //set state
        setInput(e.target.value);
    };
    const fetchOnePlant = async (e) => {
        const fetchPlant = e.target.innerText;

        try {
            const resp = await fetch("/api/singularPlant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fetchPlant }),
            });
            const data = await resp.json();

            if (data.success) {
                setError(false);
                setPlant(data.singularPlant);
            } else {
                console.log("something went wrong while fetching the data");
                setError(true);
            }
        } catch (err) {
            console.log("error in plant search ", err);
            setError(true);
        }
    };

    const handleWishlist = () => {
        console.log(
            "user wants to add to wishlist: ",
            plant.display_pid,
            "plant, ",
            plant
        );
    };

    return (
        <div className="plantExplorer">
            <div className="plantSearch">
                <h1>🔎 Discover new plants!</h1>
                <input
                    type="text"
                    name="search"
                    placeholder="Plant search"
                    onChange={(e) => handleChange(e)}
                />

                {input && <h2>Search results for {input}</h2>}
                <div className="plantList">
                    {plantSearch &&
                        plantSearch.map((plant) => {
                            return (
                                <div className="plantCell" key={plant.pid}>
                                    <h3 onClick={(e) => fetchOnePlant(e)}>
                                        {plant.display_pid}
                                    </h3>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="singularPlant">
                {plant && (
                    <>
                        <h1>{plant.display_pid}</h1>
                        <img src={plant.image_url}></img>
                        <p>
                            <strong>Light (lux units): </strong>
                            {plant.min_light_lux} min, {plant.max_light_lux}{" "}
                            max.
                        </p>
                        <p>
                            <strong>Humidity (%): </strong>
                            {plant.min_env_humid} min, {plant.max_env_humid}{" "}
                            max.
                        </p>
                        <p>
                            <strong>Temperature (celcius): </strong>
                            {plant.min_temp} min, {plant.max_temp} max.
                        </p>
                        <p>
                            <strong>Soil (moisture): </strong>
                            {plant.min_soil_moist} min, {plant.max_soil_moist}{" "}
                            max, <strong>electrical condutivity: </strong>
                            {plant.min_soil_ec} min, {plant.max_soil_ec} max.
                        </p>
                        <button onClick={() => handleWishlist()}>
                            Add to wishlist
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
