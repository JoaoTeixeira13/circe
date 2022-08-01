import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleMatchModal } from "./redux/toggleMatchModal/slice";

export default function MatchModal(props) {
    const dispatch = useDispatch();
    const modalWindow = useSelector((state) => state.toggleMatchModal);
    const closeModal = () => {
        dispatch(toggleMatchModal(!modalWindow));
    };

    return (
        <>
            {modalWindow && (
                <div className="modalWindow matchModal">
                    <img src={props.matchDisplay.image_url}></img>
                    <div className="matchInfo">
                        <Link to={`user/${props.matchDisplay.user_id}`}>
                            <img
                                onClick={() => closeModal()}
                                src={props.matchDisplay.user_pic}
                                id="modalUser"
                            />
                        </Link>
                        <h2>
                            {" "}
                            {props.matchDisplay.first} has a{" "}
                            {props.matchDisplay.display_pid} you are looking
                            for.
                        </h2>
                        <h3>Description: {props.matchDisplay.description}</h3>
                        <h3>
                            Feel free to check their profile and drop them a
                            message if you wish.
                        </h3>

                        <h2 onClick={() => closeModal()} className="closeModal">
                            X
                        </h2>
                    </div>
                </div>
            )}
        </>
    );
}
