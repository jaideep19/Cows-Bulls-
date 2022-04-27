import React, { useState } from "react";
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
const num=randomNDigitNumberNotStartingWithZero(digitLength);
console.log(num);
function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  var userNum;
  function handleChange(event) {
    const val = event.target.value;
    userNum=val;
    setInputText(val);    
    
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
      
      var ans=getHint(num,inputText);
      if (Number(ans[0])===digitLength){
          alert("Game is over!!!");
          setItems([]);
          setInputText("");
          return;
      }
      setItems(prevItems => {
        return [...prevItems, inputText+" "+ans];
      });
      setInputText("");
  }
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>Game</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Predict</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map(todoItem => (
            <li>{todoItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;



