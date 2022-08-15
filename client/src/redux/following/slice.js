export default function followingReducer(following = [], action) {
    if (action.type === "following/fetchList") {
        following = action.payload.following;
    }
    if (action.type === "following/addToList") {
        following = [...following, action.payload.user];
    }
    if (action.type === "following/removeFromList") {
        following = following.filter((user) => {
            if (user.leader_id !== action.payload.user.leader_id) {
                return user;
            }
        });
    }
    return following;
}

export function followingReceived(following) {
    return {
        type: "following/fetchList",
        payload: { following },
    };
}
export function addToFollowing(user) {

    return {
        type: "following/addToList",
        payload: { user },
    };
}

export function removeFromFollowing(user) {
    return {
        type: "following/removeFromList",
        payload: { user },
    };
}
