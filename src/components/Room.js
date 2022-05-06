import React, { useState,useEffect } from "react";
import { browserHistory } from "react-router";
import {Link} from "react-router-dom";
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:3006");


function Room () {
  const [room, setRoom] = useState("");
  const [lngth, setLngth] = useState("3");

  return (
      <div className="container">
        <div className="heading">
          <h1>Create or Join Room</h1>
        </div>
        <div className="form">
          <input placeholder = "Room Number..." onChange={(event) => {
              setRoom(event.target.value);
            }} type="text" value={room} />

            <input placeholder = "Enter the number of digits..." onChange={(event) => {
              setLngth(event.target.value);
            }} type="text" value={lngth} />  

          <Link 
            to={'/multiplayer/room/'+room}
            state={{id:room, lngth:lngth}}
          >
            <button type="button"> <span>Enter</span> </button>
          </Link>
          {/* <Link to= {'/multiplayer/room/' + room}>
              <button type="button"> <span>Enter</span> </button>
          </Link> */}
        </div>
      </div> 
  );
}

export default Room;
