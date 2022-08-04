import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Weather() {
    const user = useSelector((state) => state.user);
    const [temp, setTemp] = useState("");
    const [humidity, setHumidity] = useState("");
    const [weatherDesc, setWeatherDesc] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        user &&
            (async () => {
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
                        setTemp(data.temp);
                        setHumidity(data.humidity);
                        setWeatherDesc(data.weatherDescription);
                        setImgUrl(data.imgURL);
                    } else {
                        setWeatherDesc(
                            "Weather API is down, please look outside your window to check the weather."
                        );
                    }
                } catch (err) {
                    console.log("error in registration ", err);
                }
            })();
    }, [user]);

    return (
        <div>
            <h3>{user.location}</h3>{" "}
            {imgUrl && <img src={imgUrl} alt="weatherIcon" />}
            {console.log("img url is", imgUrl)}
            {temp && (
                <h4>
                    {temp} °C, {weatherDesc}.
                </h4>
            )}
            {humidity && <h4>{humidity}% humidity</h4>}
        </div>
    );
}
