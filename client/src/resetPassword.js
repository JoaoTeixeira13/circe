import { Component } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
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
        // this.setState({
        //     [e.target.name]: e.target.value,
        // });
    };
    const verifyEmail = async () => {
        fetch("/password/reset/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    // this.setState({
                    //     view: 2,
                    //     error: false,
                    // });
                } else {
                    // this.setState({
                    //     error: true,
                    // });
                }
            })
            .catch((err) => {
                console.log("error in email verification ", err);
                // this.setState({
                //     error: true,
                // });
            });
    };
    const newPassword = async () => {
        fetch("/password/reset/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    // this.setState({
                    //     view: 3,
                    //     error: false,
                    // });
                } else {
                    // this.setState({
                    //     error: true,
                    // });
                }
            })
            .catch((err) => {
                console.log("error in email verification ", err);
                // this.setState({
                //     error: true,
                // });
            });
    };
    const determineViewToRender = () => {
        if (state.view === 1) {
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
        } else if (state.view === 2) {
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
        } else if (state.view === 3) {
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
            {/* {this.state.error && (
                    <p className="error">
                        Oooops! Something went wrong, please retry.
                    </p>
                )} */}
            {determineViewToRender()}

            <Link to="/login">
                <h2>Back to Login</h2>
            </Link>
        </div>
    );
}
