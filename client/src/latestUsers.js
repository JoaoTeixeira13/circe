import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotFound from "./404notFound";

export default function LatestUsers() {
    const [latestUsers, setLatestUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        (async () => {
            let abort = false;

            if (!abort) {
                try {
                    const resp = await fetch(
                        `/api/latestUsers?userSearch=${searchInput}`
                    );
                    const data = await resp.json();
                    if (data.success) {
                        setLatestUsers(data.users);
                    }
                } catch (err) {
                    console.log("error in fetching newest users ", err);
                }
            }
            return () => {
                console.log("cleanup running");
                abort = true;
            };
        })();
    }, [searchInput]);

    return (
        <div className="searchContainer">
            <div className="searchInfo">
                {(!searchInput && <h2>Latest users!</h2>) ||
                    (searchInput && <h2>Search results for {searchInput}:</h2>)}
                <div>
                    <h3>Looking for someone else?</h3>
                    <input
                        onChange={(e) => setSearchInput(e.target.value)}
                        name="userSearch"
                        type="text"
                        placeholder="ex: Carmen Sandiego"
                        value={searchInput}
                    />
                </div>
            </div>
            <div className="latestPlants latestUsers">
                {latestUsers.length !== 0 &&
                    latestUsers.map((user) => {
                        return (
                            <div className="plantCell userCell" key={user.id}>
                                <Link to={`user/${user.id}`}>
                                    <img
                                        className="wishlistIcon"
                                        src={user.imageurl || "/default.png"}
                                        alt={`${user.first} ${user.last}`}
                                    />
                                </Link>

                                <h4>
                                    {user.first} , 📍 {user.location}
                                </h4>
                            </div>
                        );
                    })}
                {latestUsers.length === 0 && searchInput && (
                    <div className="notFoundContainer noUser">
                        <NotFound />
                        <h2> User not found. </h2>
                    </div>
                )}
            </div>
        </div>
    );
}
