import ProfilePicture from "./profilePic";
import Wishlist from "./wishlist";
import ToTrade from "./toTrade";
import Bio from "./bio";
import Weather from "./weather";
import { useSelector } from "react-redux";

export default function Profile() {
    const user = useSelector((state) => state.user);
    const tradeProfile = true;
    return (
        <div className="userProfile">
            <div className="userSection">
                <h1> Welcome, {user.first}!</h1>
                <Weather />
                <div className="imageSection">
                    <ProfilePicture />
                </div>
                <Bio />
            </div>

            <div className="profilePlants">
                <Wishlist />

                <ToTrade tradeProfile={tradeProfile} />
            </div>
        </div>
    );
}
