import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

import axios from "axios";

function Followers() {
    const user = useSelector((state) => state.user);
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);



    function conection(userid,followerid){
        const form = {followersID:followerid, userID:userid}
        axios.post("http://localhost:5001/con/conection",form)
            .then((res) =>  console.log(res))
    
        
    }
    return (

<div className="continer">

<div  className="main">
    <div className="followers">
    {members.map((member) => (
                <div key={member.id} >
                    <div>
                        <div  className="member-status">
                            <img src={member.picture} className="member-status-img" />
                           
                        </div>
                        <div >
                            {member.name}
                            {member._id === user?._id && " (You)"}
                            {member.status == "offline" && " (Offline)"}
                        </div>

                        <div>
                        <input type="submit" name="follow" onClick={conection(user.id,member.id)}  />

                        </div>
                    </div>
                </div>
            ))}

    </div>

</div>
</div>
    );
}

export default Followers;

