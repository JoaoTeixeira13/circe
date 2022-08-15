export default function followingReducer(following = [], action) {
    if (action.type === "following/fetchList") {
        following = action.payload.following;
    }
    if (action.type === "following/addToList") {
        following = [...following, action.payload.user.id];
    }
    if (action.type === "following/removeFromList") {
        following = following.filter((user) => {
            if (user.id !== action.payload.user.id) {
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
    console.log("user inside add following useraction is,", user);

    return {
        type: "following/addToList",
        payload: { user },
    };
}

export function removeFromFollowing(user) {
    console.log("user inside remove following action is,", user);
    return {
        type: "following/removeFromList",
        payload: { user },
    };
}
