import { combineReducers } from "redux";
import userReducer from "./user/slice";
import toggleUploaderReducer from "./toggleUploader/slice";

const rootReducer = combineReducers({
    user: userReducer,
    toggleUploader: toggleUploaderReducer,
});

export default rootReducer;
