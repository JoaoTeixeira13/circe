import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
// import FriendButton from "./friendButton";
// import NotFound from "./404notFound";
// import Friends from "./friends";

export default function OtherProfile() {
    const [otherUser, setOtherUser] = useState({});
    const { otherUserId } = useParams();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                let abort = false;
                if (!abort) {
                    const resp = await fetch(`/api/user/${otherUserId}`);
                    const data = await resp.json();
                    console.log("received user data is", data);

                    if (data.ownProfile) {
                        history.push("/");
                    } else if (data.noMatch) {
                        setOtherUser(false);
                    } else {
                        setOtherUser(data.profile);
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
    return (
        <>
            {/* {!user && <NotFound />} */}
            {otherUser && (
                <div className="userProfile">
                    <div className="imageSection">
                        <img
                            src={otherUser.imageurl || "/default.png"}
                            alt={`${otherUser.first} ${otherUser.last}`}
                        />
                    </div>
                    <div className="profileInfo">
                        <h1>{otherUser.first}'s profile</h1>
                        <h2>
                            {otherUser.first} {otherUser.last}
                        </h2>
                        <h3>{otherUser.bio}</h3>
                        {/* <FriendButton viewedUser={otherUserId} /> */}
                    </div>

                    {/* <div className="profileInfo iconDisplay">
                        {otherUserId && <Friends id={otherUserId} />}
                    </div> */}
                </div>
            )}
        </>
    );
}
