export default function Uploader() {
    
    const uploadProfilePic = async (e) => {
        e.preventDefault();

        const resp = fetch("/uploadProfilePic", {
            method: "POST",
            body: new FormData(e.target),
        });

        const data = resp.json();

        //set user state url to data.payload.imageurl
        //call the function with the opposite of current toggle boolean

        // this.props.settingProfilePic(data.payload.imageurl);
        // this.props.modalCallback();
    };

    return (
        <div className="modalWindow">
            <h2> Upload Profile Picture</h2>
            <form onSubmit={(e) => uploadProfilePic(e)} className="modalForm">
                {" "}
                <label htmlFor="input-tag">
                    Browse
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        id="input-tag"
                        required
                    />
                </label>
                <button>Submit</button>
                <h2
                    // onClick={ call function to close the modal}
                    className="closeModal"
                >
                    X
                </h2>
            </form>
        </div>
    );
}
