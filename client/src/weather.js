import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Weather() {
    const user = useSelector((state) => state.user);
    const [temp, setTemp] = useState("");
    const [humidity, setHumidity] = useState("");
    const [weatherDesc, setWeatherDesc] = useState("");
    const [weatherId, setWeatherId] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [noWeather, setNoWeather] = useState(false);

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
                        setTemp(data.temp);
                        setHumidity(data.humidity);
                        setWeatherDesc(data.weatherDescription);
                        setImgUrl(data.imgURL);
                        setWeatherId(data.weatherId);
                    } else {
                        setNoWeather(true);
                    }
                } catch (err) {
                    console.log("error in registration ", err);
                }
            })();
    }, [user]);

    return (
        <div>
            <h3>📍 {user.location}</h3>{" "}
            {(noWeather && (
                <h4>
                    Weather API is down, please look outside the window for
                    weather updates.
                </h4>
            )) || (
                <div className="weatherInfo">
                    {imgUrl && (
                        <img
                            src={imgUrl}
                            alt="weatherIcon"
                            className="weatherIcon"
                        />
                    )}
                    {temp && (
                        <h4>
                            {temp} °C, {weatherDesc}.
                        </h4>
                    )}
                    {temp > 30 && (
                        <h4>It's hot! Don't forget to water the plants!</h4>
                    )}
                    {humidity && <h4>{humidity}% humidity</h4>}
                    {humidity < 40 && (
                        <h4>
                            Your indoor plants would enjoy an extra humidity
                            boost today.
                        </h4>
                    )}
                    {humidity > 45 &&
                        temp >
                            15 &&(
                                <h4>
                                    Indoor plants would enjoy today's humidity
                                    levels, consider leaving your windows open .{" "}
                                </h4>
                            )}
                    {((weatherId >= 500 && weatherId <= 531) ||
                        (weatherId >= 200 && weatherId <= 232)) && (
                        <h4>Outdoors plants are enjoying the rain.</h4>
                    )}
                </div>
            )}
        </div>
    );
}
