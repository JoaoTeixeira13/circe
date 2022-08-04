import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Weather() {
    const user = useSelector((state) => state.user);
    console.log("current weather user location is", user.location);

    useEffect(() => {
        user &&
            (async () => {
                console.log("Weather component mounted!");
                try {
                    let resp = await fetch("/api/weather", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ location: user.location }),
                    });
                    let data = await resp.json();

                    if (data.success) {
                        console.log("received data is,", data);
                    } else {
                        console.log("no data from post request");
                    }
                } catch (err) {
                    console.log("error in registration ", err);
                }
            })();
    }, [user]);

    return (
        <div>
            <h3>Weather Component goes here</h3>
        </div>
    );
}
