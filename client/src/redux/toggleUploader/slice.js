export default function toggleUploaderReducer(toggleUploader = false, action) {
    if (action.type === "toggleUploader/toggle") {
        toggleUploader = action.payload.boolean;
    }

    return toggleUploader;
}

//Action creators
export function toggleUploader(boolean) {
    return {
        type: "toggleUploader/toggle",
        payload: { boolean },
    };
}
