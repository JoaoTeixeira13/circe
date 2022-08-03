import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadBio } from "./redux/user/slice";

export default function Bio() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [showTextArea, setShowTextArea] = useState(false);
    const [draftBio, setDraftBio] = useState("");

    const handleBioChange = (e) => {
        setDraftBio(e.target.value);
    };
    const activateEdit = () => {
        setShowTextArea(true);
        setDraftBio(user.bio);
    };

    const closeEdit = () => {
        setShowTextArea(false);
        setDraftBio(user.bio);
    };

    const submitBio = async () => {
        try {
            const resp = await fetch("/updateBio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bio: draftBio }),
            });

            const data = await resp.json();
            dispatch(uploadBio(data.payload.bio));
            setShowTextArea(false);
        } catch (err) {
            console.log("error in bio component ", err);
        }
    };

    return (
        <div>
            {showTextArea && (
                <div className="bioEdit">
                    <h2>
                        Tell others about yourself, they are curious about your
                        life.{" "}
                    </h2>
                    <textarea
                        name="draftBio"
                        value={draftBio || ""}
                        onChange={(e) => handleBioChange(e)}
                    ></textarea>
                    <div className="bioButtons">
                        <button onClick={() => submitBio()}>Submit Bio</button>
                        <button onClick={() => closeEdit()}>Return</button>
                    </div>
                </div>
            )}
            {!showTextArea && user.bio && (
                <div>
                    <h3>{user.bio}</h3>
                    <button onClick={() => activateEdit()}>Edit Bio</button>
                </div>
            )}
            {!showTextArea && !user.bio && (
                <div>
                    <button onClick={() => activateEdit()}>Add bio</button>
                </div>
            )}
        </div>
    );
}
