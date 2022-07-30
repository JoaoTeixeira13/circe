import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { matchesReceived } from "./redux/matches/slice";

export default function Matches() {
    const matches = useSelector((state) => state.matches);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("Matches component mounted!");

        (async () => {
            try {
                const resp = await fetch("/api/fetchMatches");
                const data = await resp.json();
                console.log("received match data is,", data);
                dispatch(matchesReceived(data.matches));
            } catch (err) {
                console.log("error in fetching  matches ", err);
            }
        })();
    }, []);
    return (
        <div className="matches">
            <h1>Matches Component </h1>
            <div className="plantList">
                {matches &&
                    matches.map((match) => {
                        return (
                            <div className="plantCell" key={match.id}>
                                <h4>
                                    {match.first} has a {match.display_pid}!
                                </h4>

                                <img
                                    className="wishlistIcon"
                                    src={match.image_url}
                                    alt={match.display_pid}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
