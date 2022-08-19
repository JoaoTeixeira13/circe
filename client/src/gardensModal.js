export default function GardensModal(props) {
    const closeModal = () => {
        props.setModalWindow(false);
    };

    return (
        <>
            {props.modalWindow && (
                <div className="modalWindow matchModal gardensModal">
                    <h3>{props.plantDisplay.pid}</h3>
                    <img src={props.plantDisplay.image_url}></img>
                    <h3>Description: {props.plantDisplay.description}</h3>
                    <h2 onClick={() => closeModal()} className="closeModal">
                        X
                    </h2>
                </div>
            )}
        </>
    );
}
