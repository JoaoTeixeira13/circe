import { combineReducers } from "redux";
import userReducer from "./user/slice";
import toggleUploaderReducer from "./toggleUploader/slice";
import toggleTradeUploaderReducer from "./toggleTradeUploader/slice";
import wishlistReducer from "./wishlist/slice";
import plantsToTradeReducer from "./plantsToTrade/slice";
import matchesReducer from "./matches/slice";

const rootReducer = combineReducers({
    user: userReducer,
    toggleUploader: toggleUploaderReducer,
    toggleTradeUploader: toggleTradeUploaderReducer,
    wishlist: wishlistReducer,
    plantsToTrade: plantsToTradeReducer,
    matches: matchesReducer,
});

export default rootReducer;
