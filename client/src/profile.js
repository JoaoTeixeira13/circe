import { useState } from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "./profilePic";
import Wishlist from "./wishlist";
import ToTrade from "./toTrade";
import Bio from "./bio";
import Weather from "./weather";
import MyGarden from "./myGarden";

export default function Profile() {
    const user = useSelector((state) => state.user);
    const [myGarden, setMyGarden] = useState(false);
    const tradeProfile = true;

    return (
        <div className="userProfile">
            <div className="userSection">
                <h1> Welcome, {user.first}!</h1>
                <ProfilePicture />
                <Bio />
                <Weather />
            </div>
            <div>
                <div className="toggleButtons">
                    <button onClick={() => setMyGarden(false)}>
                        Trading
                    </button>
                    <button onClick={() => setMyGarden(true)}>
                        Your Garden
                    </button>
                </div>
                {!myGarden && (
                    <div className="profilePlants">
                        <Wishlist />
                        <ToTrade tradeProfile={tradeProfile} />
                    </div>
                )}
                {myGarden && (
                    <div className="profilePlants">
                        <MyGarden />
                    </div>
                )}
            </div>
            
        </div>
    );
}
