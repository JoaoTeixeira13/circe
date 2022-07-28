import { BrowserRouter, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "./redux/user/slice";



import Logo from "./logo";
import ExplorePlants from "./explorePlants";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("App mounted!");

        (async () => {
            try {
                const resp = await fetch("/api/user");
                const data = await resp.json();

                dispatch(loggedUser(data.user));
            } catch (err) {
                console.log("error in posting users' relationship ", err);
            }
        })();

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
