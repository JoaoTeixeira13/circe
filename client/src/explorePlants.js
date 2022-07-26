import { useState, useEffect } from "react";

export default function ExplorePlants(props) {
    const [input, setInput] = useState("");
    const [plantSearch, setPlantSearch] = useState([]);
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
                props.setPlant(data.singularPlant);
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
                <h1>🔎 Find new plants!</h1>
                <input
                    type="text"
                    name="search"
                    placeholder="nomenclature (ex: Epipremnum pinnatum)"
                    onChange={(e) => handleChange(e)}
                />

                {input && <h2>Search results for {input}</h2>}
                <div className="plantList">
                    {plantSearch.length !== 0 &&
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
        </div>
    );
}
