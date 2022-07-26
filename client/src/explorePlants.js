import { useState, useEffect } from "react";

// const { getToken } = require("../../server/plantApi");

export default function ExplorePlants() {
    const [input, setInput] = useState("");
    console.log("input is", input);

    useEffect(() => {
        console.log("Explore plants mounted!");

        //do something here eventually
        //fetch initial data batch?
    }, []);

    const handleChange = (e) => {
        //set state
        setInput(e.target.value);
    };
    const handleSubmit = async () => {
        console.log("user clicked submit!");
        try {
            const resp = await fetch("/plantSearch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input }),
            });
            const data = await resp.json();

            if (data.success) {
                console.log("received data from server is", data);
            } else {
                console.log("something went wrong while fetching the data");
            }
        } catch (err) {
            console.log("error in plant search ", err);
            // this.setState({
            //     error: true,
            // });
        }
    };

    return (
        <>
            <input
                type="text"
                name="search"
                placeholder="Plant search"
                onChange={(e) => handleChange(e)}
            />

            <button onClick={() => handleSubmit()}>Search</button>
        </>
    );
}

// e
