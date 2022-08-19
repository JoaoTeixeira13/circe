import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GardensModal(props) {
    const following = useSelector((state) => state.following);

    const closeModal = () => {
        props.setModalWindow(false);
    };

    return (
        <>
            {props.modalWindow && (
                <div className="modalWindow matchModal gardensModal">
                    <img src={props.plantDisplay.image_url}></img>
                    <div className="matchInfo">
                        <Link to={`user/${props.plantDisplay.user_id}`}>
                            <div className="gardenModalProfile">
                                <img
                                    src={props.plantDisplay.user_pic}
                                    id="gardenModalUser"
                                />
                                <h3>
                                    {props.plantDisplay.first}{" "}
                                    {props.plantDisplay.last}
                                </h3>

                            </div>
                        </Link>

                        <h3>{props.plantDisplay.pid}</h3>
                        <h3>Description: {props.plantDisplay.description}</h3>
                    </div>
                    <h2 onClick={() => closeModal()} className="closeModal">
                        X
                    </h2>
                </div>
            )}
        </>
    );
}
