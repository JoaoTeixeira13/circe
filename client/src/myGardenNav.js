import { useSelector, useDispatch } from "react-redux";
import { toggleMyGardenUploader } from "./redux/toggleMyGardenUploader/slice";

export default function MyGardenNav() {
    const followers = useSelector((state) => state.followers);
    const following = useSelector((state) => state.following);
    const myGarden = useSelector((state) => state.myGarden);
    const modalWindow = useSelector((state) => state.toggleMyGardenUploader);
    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(toggleMyGardenUploader(!modalWindow));
    };

    return (
        <div className="gardenNav">
            <h1>Your Garden</h1>
            <div className="gardenStats">
                <button onClick={() => openModal()} className="uploadButton">
                    +
                </button>
                <div>
                    <h4>{myGarden.length}</h4>
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
