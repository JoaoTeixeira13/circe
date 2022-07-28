import { useDispatch, useSelector } from "react-redux";
import { uploadImageUser } from "./redux/user/slice";
import { toggleUploader } from "./redux/toggleUploader/slice";

export default function Uploader() {
    const dispatch = useDispatch();
    const modalWindow = useSelector((state) => state.toggleUploader);
    const closeModal = () => {
        dispatch(toggleUploader(!modalWindow));
    };

    const uploadProfilePic = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch("/uploadProfilePic", {
                method: "POST",
                body: new FormData(e.target),
            });

            const data = await resp.json();

            console.log("data is", data);
            dispatch(uploadImageUser(data.payload.imageurl));
            closeModal();
        } catch (err) {
            console.log("error in uploading user's picture ", err);
        }
    };

    return (
        <div className="modalWindow">
            <h2> Upload Profile Picture</h2>
            <form onSubmit={(e) => uploadProfilePic(e)} className="modalForm">
                {" "}
                <label htmlFor="input-tag">
                    Browse
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        id="input-tag"
                        required
                    />
                </label>
                <button>Submit</button>
                <h2 onClick={() => closeModal()} className="closeModal">
                    X
                </h2>
            </form>
        </div>
    );
}
