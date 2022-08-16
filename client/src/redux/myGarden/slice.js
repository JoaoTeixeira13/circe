export default function myGardenReducer(myGarden = [], action) {
    if (action.type === "myGarden/fetchList") {
        myGarden = action.payload.myGarden;
    }
    if (action.type === "myGarden/addToList") {
        myGarden = [action.payload.plant, ...myGarden];
    }
    if (action.type === "myGarden/removeFromList") {
        myGarden = myGarden.filter((plant) => {
            if (plant.id !== action.payload.plant.id) {
                return plant;
            }
        });
    }
    return myGarden;
}

export function myGardenReceived(myGarden) {
    return {
        type: "myGarden/fetchList",
        payload: { myGarden },
    };
}
export function addToMyGarden(plant) {
    return {
        type: "myGarden/addToList",
        payload: { plant },
    };
}

export function removeFromMyGarden(plant) {
    return {
        type: "myGarden/removeFromList",
        payload: { plant },
    };
}
