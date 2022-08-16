import { useDispatch, useSelector } from "react-redux";
// import { addToPlantsToTrade } from "./redux/plantsToTrade/slice";
import { toggleMyGardenUploader } from "./redux/toggleMyGardenUploader/slice";

export default function MyGardenUploader() {
    const dispatch = useDispatch();
    const modalWindow = useSelector((state) => state.toggleMyGardenUploader);
    const closeModal = () => {
        dispatch(toggleMyGardenUploader(!modalWindow));
    };

    const uploadPlant = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch("/uploadMyGardenPlant", {
                method: "POST",
                body: new FormData(e.target),
            });

            const data = await resp.json();

            // dispatch(addToPlantsToTrade(data.plant));
            closeModal();
        } catch (err) {
            console.log("error in uploading user's picture ", err);
        }
    };

    return (
        <>
            {modalWindow && (
                <div className="modalWindow">
                    <h2> Upload your collection plant! </h2>
                    <form
                        onSubmit={(e) => uploadPlant(e)}
                        className="modalForm"
                    >
                        {" "}
                        <input
                            name="plant"
                            type="text"
                            placeholder="nomenclature (ex: Ficus elastica)*"
                            required
                        />
                        <input
                            name="description"
                            type="text"
                            placeholder="description"
                        />
                        <label htmlFor="input-tag">
                            Browse picture
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
            )}
        </>
    );
}
