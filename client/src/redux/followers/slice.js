export default function followersReducer(followers = [], action) {
    if (action.type === "followers/fetchList") {
        followers = action.payload.followers;
    }

    return followers;
}

export function followersReceived(followers) {
    return {
        type: "followers/fetchList",
        payload: { followers },
    };
}
