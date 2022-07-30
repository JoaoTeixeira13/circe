import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { matchesReceived } from "./redux/matches/slice";
import { fullMatchesReceived } from "./redux/fullMatch/slice";

export default function Matches() {
    const matches = useSelector((state) => state.matches);
    const fullMatches = useSelector((state) => state.fullMatches);
    

    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch("/api/fetchMatches");
                const data = await resp.json();
                console.log("received match data is,", data);
                dispatch(matchesReceived(data.matches));
                dispatch(fullMatchesReceived(data.fullMatches));
            } catch (err) {
                console.log("error in fetching  matches ", err);
            }
        })();
    }, []);
    return (
        <div className="matches">
            <h1>Matches!</h1>
            <div className="plantList">
                {matches.length !== 0 &&
                    matches.map((match) => {
                        return (
                            <div className="plantCell" key={match.id}>
                                <h4>
                                    {match.first} has a {match.display_pid}!
                                </h4>
                                {fullMatches.length !== 0 &&
                                    fullMatches.map((each) => {
                                        return (
                                            <h4 key={each.id}>
                                                You have a {each.display_pid}{" "}
                                                they are looking for, reach out
                                                to them!
                                            </h4>
                                        );
                                    })}
                                {/* {fullMatches[i] && (
                                    <h4>
                                        You have a {fullMatches[i].display_pid}{" "}
                                        they are looking for, reach out to them!
                                    </h4>
                                )} */}

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
