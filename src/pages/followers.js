import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


import axios from "axios";



function Followers() {
    const user = useSelector((state) => state.user);
    const [Members, setMembers] = useState([])
    const [Follower, setFollower] = useState([])

    useEffect(() => {
        getData()


        // console.log(Members)


    }, [])

    function getData() {
        fetch("http://localhost:5001/members")
            .then((res) => res.json()).then((data) => {
                fetch("http://localhost:5001/con/conection/" + user._id)
                    .then((res1) => res1.json()).then((data1) => {
                        for (let i = 0; i < data.length; i++) {
                            for (let j = 0; j < data1.length; j++) {
                                if (data[i]._id == data1[j].followersID) {
                                    data[i]["conection"] = data1[j].status
                                    data[i]["deleteid"] = data1[j]._id
                                }
                            }

                        }
                        // setMembers()
                        getfollower(data)


                    }

                    )

            }
            )


    }

    
    function getfollower(data) {

        fetch("http://localhost:5001/con/follower/" + user._id)
            .then((res1) => res1.json()).then((data1) => {
                // let data = Members
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data1.length; j++) {
                        if (data[i]._id == data1[j].userID) {
                            data[i]["conection"] = data1[j].status
                            data[i]["requestid"] = data1[j]._id
                        }
                    }

                }

                setMembers([...data])
                console.log(data)


            })

    }

    function conection(followerid) {
        // console.log("hlooo")
        const form = { followersID: followerid, userID: user._id }
        axios.post("http://localhost:5001/con/conection", form)
            .then((res) => {
                getData()
            })

    }
    function deleteconection(id) {

        axios.delete("http://localhost:5001/con/conection/" + id)
            .then((res) => {
                getData()
            })


    }

    function accepetconection(id) {

        axios.patch("http://localhost:5001/con/conection/" + id)
            .then((res) => {
                getData()
            })


    }


    return (


        <div className="continer">
            <div className="continer">
                <div className="continer">
                    {Members.map((member) => (
                        <div className="continer">
                            <div className="continer">
                                <div className="continer">
                                    {member.name}
                                    {member._id === user?._id && " (You)"}
                                    {member.status == "offline" && " (Offline)"}
                                </div>

                                <div>
                                    {member.requestid !== "" && member.requestid !== null && member.requestid !== undefined ? (<><input type="submit" value="accepet" onClick={() => accepetconection(member.requestid)} />
                                        <span>

                                            {member.conection}
                                        </span></>
                                    ) : (<>{member.deleteid !== "" && member.deleteid !== null && member.deleteid !== undefined ? (<><input type="submit" value="delete" onClick={() => deleteconection(member.deleteid)} />
                                        <span>

                                            {member.conection}
                                        </span></>

                                    ) : (<> <input type="submit" value="follow" onClick={() => conection(member._id)} /></>)} </>


                                    )}






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