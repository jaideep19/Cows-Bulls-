import React from "react";
// import { browserHistory } from "react-router";
// import {Link} from "react-router-dom";
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:3006");


function PopUp (props) {

  return (props.trigger) ? (
        <div>
            { props.children }
            <button>
                <span>Rematch</span>
            </button>
        </div>  
  ) : "";
}

export default PopUp;
