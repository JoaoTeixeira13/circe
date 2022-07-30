export default function fullMatchesReducer(fullMatches = [], action) {
    if (action.type === "fullMatches/fetchList") {
        fullMatches = action.payload.fullMatches;
    }
    if (action.type === "fullMatches/addToList") {
        fullMatches = [...fullMatches, action.payload.plant];
    }
    if (action.type === "fullMatches/removeFromList") {
        fullMatches = fullMatches.filter((plant) => {
            if (plant.id !== action.payload.plant.id) {
                return plant;
            }
        });
    }
    return fullMatches;
}

export function fullMatchesReceived(fullMatches) {
    return {
        type: "fullMatches/fetchList",
        payload: { fullMatches },
    };
}
export function addToFullMatches(plant) {
    return {
        type: "fullMatches/addToList",
        payload: { plant },
    };
}

export function removeFromFullMatches(plant) {
    return {
        type: "fullMatches/removeFromList",
        payload: { plant },
    };
}
