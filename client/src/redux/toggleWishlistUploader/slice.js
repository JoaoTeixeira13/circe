export default function toggleWishlistModalReducer(
    toggleWishlistModal = false,
    action
) {
    if (action.type === "toggleWishlistModal/toggle") {
        toggleWishlistModal = action.payload.boolean;
    }

    return toggleWishlistModal;
}

export function toggleWishlistModal(boolean) {
    return {
        type: "toggleWishlistModal/toggle",
        payload: { boolean },
    };
}
