import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ResetPassword() {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [view, setView] = useState(1);

    useEffect(() => {
        console.log("Reset mounted!");

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
        console.log("input is", input);
    };
    const verifyEmail = async () => {
        try {
            const resp = await fetch("/password/reset/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input }),
            });

            const data = await resp.json();

            if (data.success) {
                setView(2);
                setError(false);
            } else {
                setError(true);
            }
        } catch (err) {
            console.log("error in reset password ", err);
            setError(true);
        }
    };
    const newPassword = async () => {
        try {
            const resp = await fetch("/password/reset/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input }),
            });

            const data = await resp.json();

            if (data.success) {
                setView(3);
                setError(false);
            } else {
                setError(true);
            }
        } catch (err) {
            console.log("error in reset password ", err);
            setError(true);
        }
    };
    const determineViewToRender = () => {
        if (view === 1) {
            return (
                <div className="form" key={"view1"}>
                    <p>
                        Please enter the email address with which you
                        registered.
                    </p>

                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={(e) => handleChange(e)}
                    />

                    <button onClick={() => verifyEmail()}>Submit</button>
                </div>
            );
        } else if (view === 2) {
            return (
                <div key={"view2"}>
                    <p>
                        Please input the code you received via email and your
                        new password.
                    </p>
                    <input
                        type="text"
                        name="code"
                        placeholder="code"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="new password"
                        onChange={(e) => handleChange(e)}
                    />
                    <button onClick={() => newPassword()}>Submit</button>
                </div>
            );
        } else if (view === 3) {
            return (
                <div key={"view1"}>
                    <p>
                        You have successfully updated your password! You may
                        proceed to login.
                    </p>
                </div>
            );
        }
    };

    return (
        <div className="form">
            {error && (
                <p className="error">
                    Oooops! Something went wrong, please retry.
                </p>
            )}
            {determineViewToRender()}

            <Link to="/login">
                <h2>Back to Login</h2>
            </Link>
        </div>
    );
}
