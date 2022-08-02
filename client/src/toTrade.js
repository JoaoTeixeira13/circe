import { toggleTradeUploader } from "./redux/toggleTradeUploader/slice";
import { useSelector, useDispatch } from "react-redux";

import ToTradeList from "./toTradeList";

export default function ToTrade(props) {
    const dispatch = useDispatch();

    const modalWindow = useSelector((state) => state.toggleTradeUploader);

    const uploadPlant = () => {
        dispatch(toggleTradeUploader(!modalWindow));
    };
    

    return (
        <div className="toTrade">
            <h1>What I'm offering</h1>
            <ToTradeList checkbox={props.tradeManager} tradeProfile={props.tradeProfile}/>

            {props.tradeManager && (
                <button onClick={() => uploadPlant()}>Add</button>
            )}
        </div>
    );
}
