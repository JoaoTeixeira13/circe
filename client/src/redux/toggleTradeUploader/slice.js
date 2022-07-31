export default function toggleTradeUploaderReducer(toggleTradeUploader = false, action) {
    if (action.type === "toggleTradeUploader/toggle") {
        toggleTradeUploader = action.payload.boolean;
    }

    return toggleTradeUploader;
}

export function toggleTradeUploader(boolean) {
    return {
        type: "toggleTradeUploader/toggle",
        payload: { boolean },
    };
}
