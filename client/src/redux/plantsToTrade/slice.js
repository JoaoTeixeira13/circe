export default function plantsToTradeReducer(plantsToTrade = [], action) {
    if (action.type === "plantsToTrade/fetchList") {
        plantsToTrade = action.payload.plantsToTrade;
    }
    if (action.type === "plantsToTrade/addToList") {
        plantsToTrade = [...plantsToTrade, action.payload.plant];
    }
    if (action.type === "plantsToTrade/removeFromList") {
        plantsToTrade = plantsToTrade.filter((plant) => {
            if (plant.id !== action.payload.plant.id) {
                return plant;
            }
        });
    }
    return plantsToTrade;
}

export function plantsToTradeReceived(plantsToTrade) {
    return {
        type: "plantsToTrade/fetchList",
        payload: { plantsToTrade },
    };
}
export function addToPlantsToTrade(plant) {
    return {
        type: "plantsToTrade/addToList",
        payload: { plant },
    };
}

export function removeFromPlantsToTrade(plant) {
    return {
        type: "plantsToTrade/removeFromList",
        payload: { plant },
    };
}
