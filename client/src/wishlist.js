import { useState, useEffect } from "react";

export default function Wishlist() {
    useEffect(()=>{
        console.log("Wishlist component mounted!")
    },[])
    return(<div>
        <h1>Wishlist Component here! </h1>
    </div>)
}
