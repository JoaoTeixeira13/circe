import { combineReducers } from "redux";
import userReducer from "./user/slice";
import toggleUploaderReducer from "./toggleUploader/slice";
import toggleTradeUploaderReducer from "./toggleTradeUploader/slice";
import toggleMatchModalReducer from "./toggleMatchModal/slice";
import toggleWishlistModalReducer from "./toggleWishlistUploader/slice";
import wishlistReducer from "./wishlist/slice";
import plantsToTradeReducer from "./plantsToTrade/slice";
import matchesReducer from "./matches/slice";
import fullMatchesReducer from "./fullMatch/slice";

const rootReducer = combineReducers({
    user: userReducer,
    toggleUploader: toggleUploaderReducer,
    toggleTradeUploader: toggleTradeUploaderReducer,
    toggleWishlistModal: toggleWishlistModalReducer,
    toggleMatchModal: toggleMatchModalReducer,
    wishlist: wishlistReducer,
    plantsToTrade: plantsToTradeReducer,
    matches: matchesReducer,
    fullMatches: fullMatchesReducer,
});

export default rootReducer;
