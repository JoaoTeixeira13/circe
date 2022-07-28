export default function wishlistReducer(wishlist = [], action) {
    if (action.type === "wishlist/fetchList") {
        wishlist = action.payload.wishlist;
    }
    if (action.type === "wishlist/addToList") {
        wishlist = [...wishlist, action.payload.plant];
    }
    return wishlist;
}

export function wishlistReceived(wishlist) {
    return {
        type: "wishlist/fetchList",
        payload: { wishlist },
    };
}
export function addToWishlist(plant) {
    return {
        type: "wishlist/addToList",
        payload: { plant },
    };
}
