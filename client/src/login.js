import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default function Login() {
    useEffect(() => {
        console.log("Login component mounted!");

        //do something here eventually
    }, []);
    const handleChange = (e) => {
        //set state
        // this.setState({
        //     [e.target.name]: e.target.value,
        // });
    };
    const handleSubmit = async () => {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    location.replace("/");
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
        <div className="form login">
            {/* {this.state.error && (
                    <p className="error">
                        oooops! something went wrong.Please retry.
                    </p>
                )} */}

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
