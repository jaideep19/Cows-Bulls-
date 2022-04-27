import React, { useState,useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3006");
function randomNDigitNumberNotStartingWithZero(N){
  
  var digits = "123456789".split(''),
      first = shuffle(digits).pop();
  
  digits.push('0');
  return parseInt( first + shuffle(digits).join('').substring(0,N-1), 10);
}
function getHint(secret, guess) {
  
  secret=''+secret;
  console.log(secret,guess);
  var map = {};
  var A = 0;
  var B = 0;
  for (var i = 0; i < 10; i++) map[i] = 0;
  for (i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) A++;
    else {
      map[secret[i]]++;
      B += map[secret[i]] <= 0 ? 1 : 0;
      map[guess[i]]--;
      B += map[guess[i]] >= 0 ? 1 : 0;
    }
  }
  console.log(A,B);
  return A + 'B' + B + 'C';
}
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
let digitLength=3;
var num=randomNDigitNumberNotStartingWithZero(digitLength);
console.log(num);
function MultiPlayer() {
  const [inputText, setInputText] = useState("");
  const [inputNumber, setInputNumber] = useState(num);
  const [items, setItems] = useState([]);
  const [isSubmitNum, setInputSubmitNum] = useState(false);
  const [room, setRoom] = useState("");
  const [buttonCol, setbuttonCol] = useState("");
  var userNum;
  function handleChange(event) {
    const val = event.target.value;
    userNum=val;
    setInputText(val);    
    
  }
  function inputChange(event) {
    const val = event.target.value;
    userNum=val;
    setInputNumber(val);    
    
  }
  function inputChangeButton(){
    let isnum = /^\d+$/.test(inputNumber);
    let val=inputNumber;
    console.log(isnum);
    if(!isnum || val.length>digitLength || val.length<=0){
        alert("Please enter valid number");
        setInputNumber("");
    }
    else{
      num=inputNumber;
      setInputSubmitNum(true);
    }
  }
  function addItem() {
    
    let isnum = /^\d+$/.test(inputText);
    let val=inputText;
    console.log(isnum);
    if(!isnum || val.length>digitLength || val.length<=0){
        alert("Please enter valid number");
        setInputText("");
    }
    else{
      

      socket.emit("send_prediction", { message:inputText, room } );
      setbuttonCol("buttonRed");
      setInputText("");
  }
  }
  const joinRoom = () => {
    console.log(room);
    if (room !== "") {
      socket.emit("join_room", room,error => {
        alert(error);
        setRoom("");
      });
    }
  };
  function disconnect(){
    socket.emit("disconnect_user",room);
    setRoom("");
    console.log(room);
  }
  
  
  useEffect(() => {
    socket.on("your_prediction", (data) => {

      console.log(inputText);
      setItems(prevItems => {
        return [...prevItems, data.message+" "+data.output];
      });

    });
  }, [socket]);
  useEffect(() => {
    socket.on("room_full", (data) => {
      console.log("room_full");
      alert("Room is full please try another room Id");
      setRoom("");
  
    });
  }, [socket]);
  useEffect(() => {
    socket.on("receive_prediction", (data) => {
      console.log(data);
      console.log(num,data.message);
      var ans=getHint(num,data.message);
      socket.emit("output_prediction",{ message:data.message,output : ans , room:data.room});
      setbuttonCol("buttonGreen");

    });
  }, [socket]);
  console.log(buttonCol=="buttonGreen");
  // function changeButtonColor(){
  //   if(buttonCol=="buttonGreen"){

  //   }
  // }
  return (
    <div className="container">
      <div className="heading">
        <h1>Game</h1>
      </div>
      <div className="form">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        type="text" value={room} 
      />
      <button onClick={joinRoom}>
      <span>Join Room</span>
       </button>
      <input onChange={inputChange}  readOnly={isSubmitNum ? true : false}  type="text" value={inputNumber} />
        <button onClick={inputChangeButton}>
          <span>My Number</span>
        </button>
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem} className={buttonCol} disabled={changeButtonColor}>
          <span>My Prediction</span>
        </button>

      </div>
      <div>
        <ul>
          {items.map(todoItem => (
            <li key={todoItem.uniqueId}>{todoItem}</li>
          ))}
        </ul>
      </div>
      <button onClick={disconnect}>
          <span>Disconnect</span>
        </button>
    </div>
  );
}

export default MultiPlayer;



