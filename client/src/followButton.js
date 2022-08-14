import { useState, useEffect } from "react";

export default function FollowButton({ viewedUser }) {
    const [buttonText, setButtonText] = useState("");
    console.log("viewed user is,", viewedUser);

    useEffect(() => {
        (async () => {
            console.log("friend button just mounted");
            try {
                const resp = await fetch(`/api/relation/${viewedUser}`);
                const data = await resp.json();
                console.log("data received back from server is", data);

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
                console.log("data received back is", data);
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
