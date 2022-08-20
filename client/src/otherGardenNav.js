export default function OtherGardenNav(props) {
    return (
        <>
            {props.garden && (
                <div className="gardenNav">
                    <h1>{props.otherUser.first}'s Garden</h1>
                    <div className="gardenStats">
                        <div>
                            <h4>{props.garden.length}</h4>
                            <h4>Posts</h4>
                        </div>

                        <div>
                            <h4>{props.followers.length}</h4>
                            <h4>Followers</h4>
                        </div>

                        <div>
                            <h4>{props.following.length}</h4>
                            <h4>Following</h4>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
