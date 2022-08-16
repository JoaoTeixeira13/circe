import MyGardenNav from "./myGardenNav";
import MyGardenCollection from "./myGardenCollection";
import MyGardenUploader from "./myGardenUploader";

export default function MyGarden() {
    

    return (
        <div className="garden">
            <MyGardenNav />
            <hr className="breakBar" />
            <MyGardenCollection />
            <MyGardenUploader />
        </div>
    );
}
