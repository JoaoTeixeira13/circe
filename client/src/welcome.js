import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetPassword";

export default function Welcome() {
    useEffect(() => {
        console.log("Welcome component mounted!");

        //do something here eventually
    }, []);

    return (
        <div id="welcome">
            <BrowserRouter>
                <div className="welcome-paths">
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/reset">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}