export default function matchesReducer(matches = [], action) {
    if (action.type === "matches/fetchList") {
        matches = action.payload.matches;
    }
    if (action.type === "matches/addToList") {
        matches = [...matches, action.payload.plant];
    }
    if (action.type === "matches/removeFromList") {
        matches = matches.filter((plant) => {
            if (plant.id !== action.payload.plant.id) {
                return plant;
            }
        });
    }
    return matches;
}

export function matchesReceived(matches) {
    return {
        type: "matches/fetchList",
        payload: { matches },
    };
}
export function addToMatches(plant) {
    return {
        type: "matches/addToList",
        payload: { plant },
    };
}

export function removeFromMatches(plant) {
    return {
        type: "matches/removeFromList",
        payload: { plant },
    };
}
