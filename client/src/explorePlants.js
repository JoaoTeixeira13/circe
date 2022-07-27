import { useState, useEffect } from "react";

export default function ExplorePlants() {
    const [input, setInput] = useState("");
    const [plantSearch, setPlantSearch] = useState([]);
    const [plant, setPlant] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("Explore plants mounted!");

        //do something here eventually
        //fetch initial data batch?
    }, []);

    const handleChange = (e) => {
        //set state
        setInput(e.target.value);
    };
    const handleClick = async (e) => {
        // setPlant(e.target.innerText);
        const fetchPlant = e.target.innerText;
        console.log("user clicked on plant", fetchPlant);
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
                console.log("received data from server is", data);
                setError(false);
                setPlant(data.singularPlant);
                console.log("plant  is,", plant);
            } else {
                console.log("something went wrong while fetching the data");
                setError(true);
            }
        } catch (err) {
            console.log("error in plant search ", err);
            setError(true);
        }

        // console.log(e.target.innerText);
    };
    const handleSubmit = async () => {
        console.log("user clicked submit!");
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
                console.log("received data from server is", data.plantSearch);
                setPlantSearch(data.plantSearch);
                setError(false);
                console.log("plant search is,", plantSearch);
            } else {
                console.log("something went wrong while fetching the data");
                setError(true);
            }
        } catch (err) {
            console.log("error in plant search ", err);
            setError(true);
        }
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

                <button onClick={() => handleSubmit()}>Search</button>

                <div>
                    <p>Incoming data being mapped here</p>
                    {plantSearch &&
                        plantSearch.map((plant) => {
                            return (
                                <div className="plantCell" key={plant.pid}>
                                    <h3 onClick={(e) => handleClick(e)}>
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
                        <h2>{plant.display_pid}</h2>
                        <img src={plant.image_url}></img>
                        <p>
                            Light (lux units): {plant.min_light_lux} min,{" "}
                            {plant.max_light_lux} max.
                        </p>
                        <p>
                            Humidity(%): {plant.min_env_humid} min,{" "}
                            {plant.max_env_humid} max.
                        </p>
                        <p>
                            Temperature (celcius): {plant.min_temp} min,{" "}
                            {plant.max_temp} max.
                        </p>
                        <p>
                            Soil (moisture): {plant.min_soil_moist} min,{" "}
                            {plant.max_soil_moist} max, electrical condutivity:
                            {plant.min_soil_ec} min, {plant.max_soil_ec} max.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

// e
