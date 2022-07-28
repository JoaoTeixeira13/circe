export default function userReducer(user = "", action) {
    if (action.type === "user/loggedUser") {
        user = action.payload.user;
    }

    if (action.type === "user/uploadUrl") {
        user = { ...user, imageurl: action.payload.url };
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
