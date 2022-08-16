export default function toggleMyGardenUploaderReducer(
    toggleMyGardenUploader = false,
    action
) {
    if (action.type === "toggleMyGardenUploader/toggle") {
        toggleMyGardenUploader = action.payload.boolean;
    }

    return toggleMyGardenUploader;
}

export function toggleMyGardenUploader(boolean) {
    return {
        type: "toggleMyGardenUploader/toggle",
        payload: { boolean },
    };
}
