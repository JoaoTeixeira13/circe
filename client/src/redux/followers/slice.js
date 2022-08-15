export default function followersReducer(followers = [], action) {
    if (action.type === "followers/fetchList") {
        followers = action.payload.followers;
    }
    if (action.type === "followers/addToList") {
        followers = [...followers, action.payload.follower];
    }
    if (action.type === "followers/removeFromList") {
        followers = followers.filter((follower) => {
            if (follower.id !== action.payload.follower.id) {
                return follower;
            }
        });
    }
    return followers;
}

export function followersReceived(followers) {
    return {
        type: "followers/fetchList",
        payload: { followers },
    };
}
export function addToFollowers(follower) {
    return {
        type: "followers/addToList",
        payload: { follower },
    };
}

export function removeFromFollowers(follower) {
    return {
        type: "followers/removeFromList",
        payload: { follower },
    };
}
