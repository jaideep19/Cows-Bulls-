import React, { useState,useEffect } from "react";
import { browserHistory } from "react-router";
import {Link} from "react-router-dom";

function Root () {  
  const [id, setId] = useState("");

  function myFunction() {
    // console.log(inp, document.getElementById(inp), document.getElementById('myDIV'));
    console.log(id);
    var x = document.getElementById(id);
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  return (
      <div className="container">
        <div className="heading">
          <h1>Cows and Bulls Game</h1>
        </div>

        <button onClick={function(event){ setId("myDIV1"); myFunction()}}><span>MultiPlayer</span></button>
        <div className="form" id="myDIV1" style={{display: 'none'}}>
          <Link to={"/multiplayer"} state={{flg:false}}> <button type="button"> <span>Create Room</span> </button> </Link>
          <Link to={"/multiplayer"} state={{flg:true}}> <button type="button"> <span>Join Room</span> </button> </Link>
          {/* <button onClick={enterMultiPlayer}> <span>MultiPlayer</span> </button>
          <button onClick={inputChangeButton}> <span>SinglePlayer</span> </button>        */}
        </div>
        <div className="form">
          <Link to="/singleplayer"> <button type="button"> <span>SinglePlayer</span> </button> </Link>
        </div>
          
        <button onClick={function(event){ setId("myDIV"); myFunction()}}><span>Instructions</span></button>
        <div id="myDIV" style={{display: 'none'}}>
          <h3>Instructions</h3>
          <ul>
            <li>This is a simple 2 player number guessing game</li>
            <li>Each player chooses a n-digit number and the other player has to guess this number</li>
            <li>For every guess, number of bulls and number of cows are returned</li>
            <li>If the guess and the target number have 1 digit in common and in the correct position then 1 Bull is returned</li>
            <li>If the guess and the target number have 1 digit in common but in the wrong position then 1 Cow is returned</li>
            <li>The first player to guess the opponents number wins</li>
            <li>Have fun!</li>
          </ul> 
        
        </div> 
        
      </div> 
  );
    
}

export default Root;