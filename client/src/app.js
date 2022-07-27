import { BrowserRouter, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Logo from "./logo";
import ExplorePlants from "./explorePlants";

export default function App() {
    useEffect(() => {
        console.log("App mounted!");

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

    const logout = async () => {
        try {
            const resp = await fetch("/logout");
            await resp.json();
            location.reload();
        } catch (err) {
            console.log("error is ", err);
        }
    };

    return (
        <div className="mainApp">
            <BrowserRouter>
                <nav className="profileHeader">
                    <Logo />
                    <div className="navRight">
                        <Link to="/explore">
                            <h2>Explore</h2>
                        </Link>
                        <Link to="/">
                            <h2>Profile</h2>
                        </Link>
                        <Link to="/">
                            <h2 onClick={() => logout()} id="logout">
                                Logout{" "}
                            </h2>
                        </Link>
                    </div>
                </nav>
                <Route exact path="/"></Route>
                <Route path="/explore">
                    <ExplorePlants />
                </Route>
            </BrowserRouter>
        </div>
    );
}
