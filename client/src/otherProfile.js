import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import OtherWishlist from "./otherWishlist";
import OtherPlantsToTrade from "./otherPlantsToTrade";
import FollowButton from "./followButton";
import OtherGarden from "./otherGarden";
// import NotFound from "./404notFound";

export default function OtherProfile() {
    const [otherUser, setOtherUser] = useState({});
    const [otherGarden, setOtherGarden] = useState(false);
    const [userWishlist, setUserWishlist] = useState([]);
    const [userPlants, setUserPlants] = useState([]);
    const [garden, setGarden] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const tradeProfile = true;
    const [message, setMessage] = useState(false);
    const { otherUserId } = useParams();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                let abort = false;
                if (!abort) {
                    const resp = await fetch(`/api/user/${otherUserId}`);
                    const data = await resp.json();

                    if (data.ownProfile) {
                        history.push("/");
                    } else if (data.noMatch) {
                        setOtherUser(false);
                    } else {
                        setOtherUser(data.profile);
                        setUserWishlist(data.userWishlist);
                        setUserPlants(data.userPlants);
                        setFollowers(data.followers);
                        setFollowing(data.following);
                        setGarden(data.garden);
                    }
                }
                return () => {
                    abort = true;
                };
            } catch (err) {
                console.log("error in registration ", err);
            }
        })();
    }, []);

    const messageUser = () => {
        setMessage(!message);
    };
    return (
        <>
            {/* {!user && <NotFound />} */}
            {otherUser && (
                <div className="userProfile">
                    <div className="userSection">
                        <div className="imageSection">
                            <img
                                src={otherUser.imageurl || "/default.png"}
                                alt={`${otherUser.first} ${otherUser.last}`}
                            />
                        </div>
                        <div className="profileInfo">
                            <h2>
                                {otherUser.first} {otherUser.last}
                            </h2>
                            <h3>📍 {otherUser.location}</h3>
                            <h3>{otherUser.bio}</h3>
                        </div>
                        <FollowButton viewedUser={otherUserId} />
                        <button onClick={() => messageUser()}>Contact</button>
                        {message && (
                            <div>
                                <textarea placeholder="Type your message here"></textarea>
                                <button onClick={() => messageUser()}>
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="toggleButtons">
                            <button
                                onClick={() => setOtherGarden(false)}
                                className={`${!otherGarden ? " pressed" : ""}`}
                            >
                                Trading
                            </button>
                            <button
                                onClick={() => setOtherGarden(true)}
                                className={`${otherGarden ? " pressed" : ""}`}
                            >
                                Garden
                            </button>
                        </div>
                        {!otherGarden && (
                            <div className="profilePlants">
                                <OtherWishlist userWishlist={userWishlist} />
                                <OtherPlantsToTrade
                                    userPlants={userPlants}
                                    tradeProfile={tradeProfile}
                                />
                            </div>
                        )}
                        {otherGarden && (
                            <div className="profilePlants">
                                <OtherGarden
                                    otherUser={otherUser}
                                    garden={garden}
                                    followers={followers}
                                    following={following}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
