export default function toggleMatchModalReducer(
    toggleMatchModal = false,
    action
) {
    if (action.type === "toggleMatchModal/toggle") {
        toggleMatchModal = action.payload.boolean;
    }

    return toggleMatchModal;
}

export function toggleMatchModal(boolean) {
    return {
        type: "toggleMatchModal/toggle",
        payload: { boolean },
    };
}
