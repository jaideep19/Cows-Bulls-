/* eslint-disable */

import React, { useState, useEffect } from 'react'
// import { warningOnce } from "react-router/lib/router";
import io from 'socket.io-client'
import { useNavigate, useLocation } from 'react-router-dom'
import PopUp from './PopUp'
const socket = io.connect('http://localhost:3030')

function randomNDigitNumberNotStartingWithZero (N) {
  const digits = '123456789'.split('')
  const first = shuffle(digits).pop()

  digits.push('0')
  return parseInt(first + shuffle(digits).join('').substring(0, N - 1), 10)
}

function getHint (secret, guess) {
  secret = '' + secret
  guess = '' + guess
  console.log(secret, guess)
  const map = {}
  let A = 0
  let B = 0
  for (var i = 0; i < 10; i++) map[i] = 0
  for (i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) A++
    else {
      map[secret[i]]++
      B += map[secret[i]] <= 0 ? 1 : 0
      map[guess[i]]--
      B += map[guess[i]] >= 0 ? 1 : 0
    }
  }
  console.log(A, B)
  return A + 'B' + B + 'C'
}

function shuffle (o) {
  x
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o
}

// let digitLength=3;
// // var num=randomNDigitNumberNotStartingWithZero(digitLength);
// console.log(num);

function MultiPlayer (props) {
  const location = useLocation()
  const [digitLength, setdigitLength] = useState(location.state.lngth.toString())
  let num = randomNDigitNumberNotStartingWithZero(digitLength)

  const [output, setOutput] = useState('You Won')
  const [inputText, setInputText] = useState(num)
  const [inputNumber, setInputNumber] = useState(num)
  const [items, setItems] = useState([])
  const [isSubmitNum, setInputSubmitNum] = useState(false)
  const [room, setRoom] = useState(location.state.id)
  const [buttonCol, setbuttonCol] = useState('buttonRed')
  let userNum
  const id = 'myDIV'
  // var num=randomNDigitNumberNotStartingWithZero(digitLength);
  console.log(num)
  const navigate = useNavigate()

  // console.log(props.location.state);
  // setRoom("123");
  // console.log(props.id);
  // console.log(room);
  // if (room !== "") {
  //   socket.emit("join_room", room,error => {
  //     alert(error);
  //     setRoom("");
  //   });
  // }
  function handleChange (event) {
    const val = event.target.value
    userNum = val
    setInputText(val)
  }

  function inputChange (event) {
    const val = event.target.value
    userNum = val
    setInputNumber(val)
  }

  function inputChangeButton () {
    const isnum = /^\d+$/.test(inputNumber)
    const val = inputNumber
    console.log(isnum)
    console.log(val.length, val, String(val).length, digitLength)
    if (!isnum || Number(String(val).length) != Number(digitLength)) {
      alert('Please enter valid number')
      setInputNumber('')
    } else {
      num = inputNumber
      setInputSubmitNum(true)
    }
  }

  function addItem () {
    const isnum = /^\d+$/.test(inputText)
    const val = inputText
    console.log(isnum)
    if (!isnum || String(val).length != Number(digitLength)) {
      alert('Please enter valid number')
      setInputText('')
    } else {
      socket.emit('send_prediction', { message: inputText, room })
      setbuttonCol('buttonRed')
      setInputText('')
    }
  }

  function joinRoom () {
    console.log(room)
    if (room !== '') {
      socket.emit('join_room', room, error => {
        alert(error)
        setRoom('')
      })
    }
    if (digitLength == '') {
      socket.emit('get_length', room)
    }
  };

  function disconnect () {
    socket.emit('disconnect_user', room)
    navigate('/')
    setRoom('')
    console.log(room)
  }

  function myFunction () {
    const x = document.getElementById('myDIV')
    if (x.style.display === 'block') {
      x.style.display = 'none'
    } else {
      x.style.display = 'block'
    }
  }

  function myFunction1 () {
    const x = document.getElementById('myDIV1')
    if (x.style.display === 'block') {
      x.style.display = 'none'
    } else {
      x.style.display = 'block'
    }
  }

  useEffect(() => {
    socket.on('set_lngth', (data) => {
      console.log(data)
      const l = data.toString()
      // debugger;
      setdigitLength(l)
      num = randomNDigitNumberNotStartingWithZero(l)
      setInputNumber(num)
      setInputText(num)
      console.log(digitLength, inputNumber, inputText, num)
    })
  }, [socket])

  useEffect(() => {
    socket.on('get_lngth', (data) => {
      socket.emit('set_length', { length: digitLength, room: data })
    })
  }, [socket])

  useEffect(() => {
    socket.on('game_stat', (data) => {
      if (data.message == 'Won') {
        setbuttonCol('buttonRed')
        setOutput('You Lost')
        myFunction()
      } else if (data.message == 'Disconnected') {
        setbuttonCol('buttonRed')
        myFunction1()
        disconnect()
      }
    })
  }, [socket])

  useEffect(() => {
    socket.on('your_prediction', (data) => {
      console.log(inputText)
      setItems(prevItems => {
        return [...prevItems, data.message + ' ' + data.output]
      })
      console.log(digitLength.concat('B0C'))
      if (data.output == String(digitLength).concat('B0C')) {
        socket.emit('game_status', { message: 'Won', room: data.room })
        setbuttonCol('buttonRed')
        myFunction()
      }
    })
  }, [socket])

  useEffect(() => {
    socket.on('room_full', (data) => {
      console.log('room_full')
      alert('Room is full please try another room Id')
      setRoom('')
    })
  }, [socket])

  useEffect(() => {
    socket.on('receive_prediction', (data) => {
      console.log(data)
      console.log(num, data.message, inputNumber)
      const ans = getHint(num, data.message)
      socket.emit('output_prediction', { message: data.message, output: ans, room: data.room })
      setbuttonCol('buttonGreen')
    })
  }, [socket])

  useEffect(() => {
    socket.on('change_color', (data) => {
      setbuttonCol('buttonGreen')
      console.log(buttonCol)
    })
  }, [socket])

  console.log(buttonCol == 'buttonGreen')

  useEffect(() => {
    console.log('34567890987654567890')
    joinRoom()
  }, [])

  return (
    <div className="container">
      <div className="heading">
        <h1>Game</h1>
      </div>
      <div className="form">
      {/* <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        type="text" value={room}
      />
      <button onClick={joinRoom}>
      <span>Join Room</span>
       </button> */}
      <input onChange={inputChange} readOnly={!!isSubmitNum} type="text" value={inputNumber} />
        <button onClick={inputChangeButton}>
          <span>My Number</span>
        </button>
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem} className={buttonCol} disabled={buttonCol == 'buttonRed'}>
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

      {/* <button onClick={myFunction}><span>Trigger</span></button> */}
      <div id="myDIV" style={{ display: 'none' }}>
            <h3>{output}</h3>
            <button>
                <span>Rematch</span>
            </button>
      </div>

      <div id="myDIV1" style={{ display: 'none' }}>
            <h3>Opponent disconnected. Go Home to join a new room</h3>
      </div>

      <button onClick={disconnect}>
          <span>Home</span>
      </button>
    </div>
  )
}

module.exports.getHint = getHint;
module.exports.randomNDigitNumberNotStartingWithZero = randomNDigitNumberNotStartingWithZero;

export default MultiPlayer
