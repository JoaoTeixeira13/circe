import { BrowserRouter, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

// import ProfilePicture from "./profilePicture";
// import Uploader from "./uploader";
import Logo from "./logo";
// import Profile from "./profile";
// import FindPeople from "./findPeople";
// import OtherProfile from "./otherProfile";
// import FriendsAndWannabees from "./friends-wannabees";
// import ChatWindow from "./chatWindow";

export default function App() {
    useEffect(() => {
        console.log("App mounted!");

        //do something here eventually

        // fetch("/api/user")
        //         .then((resp) => resp.json())
        //         .then((data) => {
        //             console.log("data is", data)
        //         })
        //         .catch((err) => {
        //             console.log("error is ", err);
        //         });
    }, []);

    return (
        <div className="mainApp">
            <h1>Main App will go here</h1>
        </div>
    );
}
