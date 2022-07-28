import { useSelector, useDispatch } from "react-redux";
import { toggleUploader } from "./redux/toggleUploader/slice";

export default function ProfilePicture() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const modalWindow = useSelector((state) => state.toggleUploader);

    const switchPic = () => {
        dispatch(toggleUploader(!modalWindow));
    };

    return (
        <div>
            <img
                className="profilePicture"
                onClick={() => switchPic()}
                src={user.imageurl || "/default.png"}
                alt={`${user.first} ${user.last}`}
            />
        </div>
    );
}
