import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Registration() {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("Registration mounted!");

        //do something here eventually

        // fetch("/api/user")
        //         .then((resp) => resp.json())
        //         .then((data) => {
        //             console.log("data is", data)
        //         })
        //         .catch((err) => {
        //             console.log("error is ", err);
        //         });
    }, []);
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        console.log("button clicked");
        console.log("input is", input);
        try {
            let resp = await fetch("/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input }),
            });
            let data = await resp.json();

            if (data.success) {
                location.reload();
            } else {
                setError(true);
            }
        } catch (err) {
            console.log("error in registration ", err);
            setError(true);
        }
    };

    return (
        <div className="form">
            {error && (
                <p className="error">
                    oooops! something went wrong. Please retry.
                </p>
            )}
            <input
                type="text"
                name="first"
                placeholder="first"
                onChange={(e) => handleChange(e)}
            />
            <input
                type="text"
                name="last"
                placeholder="last"
                onChange={(e) => handleChange(e)}
            />
            <input
                type="text"
                name="location"
                placeholder="your location (city, town)"
                onChange={(e) => handleChange(e)}
            />
            <input
                type="email"
                name="email"
                placeholder="email"
                onChange={(e) => handleChange(e)}
            />
            <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => handleChange(e)}
            />
            <button onClick={() => handleSubmit()}>Create account</button>
            <Link to="/login" className="registration-link">
                <h2>Already registered? Click here to Log in.</h2>
            </Link>
        </div>
    );
}
