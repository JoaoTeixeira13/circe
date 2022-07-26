import { BrowserRouter, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "./redux/user/slice";
import { toggleUploader } from "./redux/toggleUploader/slice";
import { wishlistReceived } from "./redux/wishlist/slice";
import { plantsToTradeReceived } from "./redux/plantsToTrade/slice";
import { followersReceived } from "./redux/followers/slice";
import { followingReceived } from "./redux/following/slice";
import { myGardenReceived } from "./redux/myGarden/slice";

import Logo from "./logo";
import ExploreWindow from "./exploreWindow";
import Profile from "./profile";
import ProfilePicture from "./profilePic";
import OtherProfile from "./otherProfile";
import LatestActivity from "./latestActivity";
import Uploader from "./profilePicUploader";
import TradeWindow from "./tradeWindow";
import GardensWindow from "./gardensWindow";

export default function App() {
    const dispatch = useDispatch();
    const modalWindow = useSelector((state) => state.toggleUploader);

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch("/api/user");
                const data = await resp.json();
                dispatch(loggedUser(data.user));
                dispatch(toggleUploader(false));
                dispatch(wishlistReceived(data.wishlist));
                dispatch(plantsToTradeReceived(data.plantsToTrade));
                dispatch(followersReceived(data.followers));
                dispatch(followingReceived(data.following));
                dispatch(myGardenReceived(data.myGarden));
            } catch (err) {
                console.log("error in fetching  logged user ", err);
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
                        <Link to="/gardens">
                            <h2>Gardens</h2>
                        </Link>
                        <Link to="/news">
                            <h2>News</h2>
                        </Link>
                        <Link to="/trade">
                            <h2>Trade</h2>
                        </Link>
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
                        <ProfilePicture />
                    </div>
                </nav>
                <Route exact path="/">
                    <Profile />
                </Route>
                {modalWindow && <Uploader />}
                <Route path="/explore">
                    <ExploreWindow />
                </Route>
                <Route path="/trade">
                    <TradeWindow />
                </Route>
                <Route path="/news">
                    <LatestActivity />
                </Route>
                <Route path="/gardens">
                    <GardensWindow />
                </Route>
                <Route path="/user/:otherUserId">
                    <OtherProfile />
                </Route>
            </BrowserRouter>
        </div>
    );
}
