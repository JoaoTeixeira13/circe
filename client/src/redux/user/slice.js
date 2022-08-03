export default function userReducer(user = "", action) {
    if (action.type === "user/loggedUser") {
        user = action.payload.user;
    }

    if (action.type === "user/uploadUrl") {
        user = { ...user, imageurl: action.payload.url };
    }

    if (action.type === "user/bio") {
        user = { ...user, bio: action.payload.bio };
    }

    return user;
}

//Action creators
export function loggedUser(user) {
    return {
        type: "user/loggedUser",
        payload: { user },
    };
}
export function uploadImageUser(url) {
    return {
        type: "user/uploadUrl",
        payload: { url },
    };
}

export function uploadBio(bio) {
    return {
        type: "user/bio",
        payload: { bio },
    };
}
