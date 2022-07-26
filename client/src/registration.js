import { Component } from "react";
import { Link } from "react-router-dom";

export default function Registration() {
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
        // this.setState({
        //     [e.target.name]: e.target.value,
        // });
    };
    const handleSubmit = async () => {
        fetch("/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    location.reload();
                } else {
                    // this.setState({
                    //     error: true,
                    // });
                }
            })
            .catch((err) => {
                console.log("error in registration ", err);
                // this.setState({
                //     error: true,
                // });
            });
    };

    return (
        <div className="form">
            {/* {this.state.error && (
                <p className="error">
                    oooops! something went wrong. Please retry.
                </p>
            )} */}
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
