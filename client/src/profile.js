import ProfilePicture from "./profilePic";
import Wishlist from "./wishlist";
import ToTrade from "./toTrade";
// import Bio from "./bio";
import { useSelector } from "react-redux";

export default function Profile() {
    const user = useSelector((state) => state.user);
    return (
        <div className="userProfile">
            <div className="imageSection">
                <ProfilePicture />
            </div>
            <div className="profileInfo">
                <h1>
                    {" "}
                    Welcome to your profile, {user.first}! It's a nice day in{" "}
                    {user.location}.
                </h1>

                {/* <Bio /> */}
            </div>
            <Wishlist/>
            <ToTrade/>
        </div>
    );
}
