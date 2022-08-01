import ProfilePicture from "./profilePic";
import Wishlist from "./wishlist";
import ToTrade from "./toTrade";
// import Bio from "./bio";
import { useSelector } from "react-redux";

export default function Profile() {
    const user = useSelector((state) => state.user);
    return (
        <div className="userProfile">
            <div className="userSection">
                <h1>
                    {" "}
                    Welcome, {user.first}! <br /> It's a nice day in{" "}
                    {user.location}.
                </h1>
                <div className="imageSection">
                    <ProfilePicture />
                </div>
                <div className="profileInfo"> </div>
            </div>

            <div className="profilePlants">
                <Wishlist />

                <ToTrade />
            </div>
        </div>
    );
}
