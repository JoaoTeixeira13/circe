import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    useEffect(() => {
        console.log("Login component mounted!");

        //do something here eventually
    }, []);
    const handleChange = (e) => {
        //set state
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        try {
            const resp = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input }),
            });

            const data = await resp.json();

            if (data.success) {
                location.replace("/");
            } else {
                setError(true);
            }
        } catch (err) {
            console.log("error in registration ", err);
            setError(true);
        }
    };

    return (
        <div className="form login">
            {error && (
                <p className="error">
                    oooops! something went wrong.Please retry.
                </p>
            )}

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
            <button onClick={() => handleSubmit()}>Login</button>
            <Link to="/reset">
                <h3>Forgot your password?</h3>
            </Link>
            <Link to="/" className="registration-link">
                <h2>Don't have an account yet? You can register here.</h2>
            </Link>
        </div>
    );
}
