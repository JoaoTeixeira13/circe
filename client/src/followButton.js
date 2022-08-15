import { useState, useEffect } from "react";


export default function FollowButton({ viewedUser }) {

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
                // if (
                //     data.buttonText === "Follow" ||
                //     data.buttonText === "Follow Back"
                // ) {
                //     console.log("user was just unfollowed");
                // } else if (data.buttonText === "Unfollow") {
                //     console.log("user was just followed");
                // }
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
