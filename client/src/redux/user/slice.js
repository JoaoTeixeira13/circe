export default function userReducer(user = "", action) {
    if (action.type === "user/loggedUser") {
        user = action.payload.user;
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
