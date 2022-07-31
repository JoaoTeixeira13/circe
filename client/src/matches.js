import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { matchesReceived } from "./redux/matches/slice";
import { fullMatchesReceived } from "./redux/fullMatch/slice";
import { toggleMatchModal } from "./redux/toggleMatchModal/slice";

export default function Matches(props) {
    console.log("props inside modal component are", props);
    const matches = useSelector((state) => state.matches);
    const fullMatches = useSelector((state) => state.fullMatches);
    const dispatch = useDispatch();

    const modalWindow = useSelector((state) => state.toggleMatchModal);

    const openMatch = (match) => {
        props.setMatchDisplay(match);
        dispatch(toggleMatchModal(!modalWindow));
    };
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
                            <div
                                onClick={() => openMatch(match)}
                                className="plantCell"
                                key={match.id}
                            >
                                {fullMatches.length !== 0 &&
                                    fullMatches.map((each) => {
                                        if (
                                            each.other_user_id === match.user_id
                                        ) {
                                            return (
                                                <h3 key={each.id}>
                                                    FULL MATCH! You have a{" "}
                                                    {each.display_pid} they are
                                                    looking for!
                                                </h3>
                                            );
                                        }
                                    })}

                                <img
                                    className="wishlistIcon"
                                    src={match.image_url}
                                    alt={match.display_pid}
                                />
                                <h3>
                                    {match.first} has a {match.display_pid}!
                                </h3>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
