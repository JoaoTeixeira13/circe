import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyGardenNav() {
    const [posts, setPosts] = useState([]);
    const followers = useSelector((state) => state.followers);
    const following = useSelector((state) => state.following);

    useEffect(() => {
        console.log("garden NavBar component mounted");
    }, []);

    const openModal = () => {
        console.log("user wants to upload Picture");
    };

    return (
        <div className="gardenNav">
            <h1>Your Garden</h1>
            <div className="gardenStats">
                <button onClick={() => openModal()} className="uploadButton">
                    +
                </button>
                <div>
                    <h4>{posts.length}</h4>
                    <h4>Posts</h4>
                </div>

                <div>
                    <h4>{followers.length}</h4>
                    <h4>Followers</h4>
                </div>

                <div>
                    <h4>{following.length}</h4>
                    <h4>Following</h4>
                </div>
            </div>
        </div>
    );
}
