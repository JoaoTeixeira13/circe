import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToFollowing } from "./redux/following/slice";
import { removeFromFollowing } from "./redux/following/slice";

export default function FollowButton({ viewedUser }) {
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch(`/api/relation/${viewedUser}`);
                const data = await resp.json();

                setButtonText(data.buttonText);
            } catch (err) {
                console.log("error in fetching users' relationship ", err);
            }
        })();
    }, []);

    const handleFollow = () => {
        (async () => {
            try {
                const resp = await fetch(`/api/requestHandle/${viewedUser}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ buttonText }),
                });
                const data = await resp.json();
                if (
                    data.buttonText == "Follow" ||
                    data.buttonText == "Follow Back"
                ) {
                    dispatch(removeFromFollowing(data.user));
                } else if (data.buttonText == "Unfollow") {
                    dispatch(addToFollowing(data.user));
                }
                setButtonText(data.buttonText);
            } catch (err) {
                console.log("error in posting users' relationship ", err);
            }
        })();
    };

    return (
        <>
            {" "}
            <button onClick={() => handleFollow()}> {buttonText}</button>
        </>
    );
}
