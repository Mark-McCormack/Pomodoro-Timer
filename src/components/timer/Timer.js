import React, { useState } from "react";
import "./Timer.css";

function Timer() {
  let timer;

  const [inputSeconds, setInputSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1500);

  function startTimer() {
    // Decrease Time Every Second by 1 Second
    timer = setInterval(() => { setSeconds((prevCount) => prevCount - 1) }, 1000);

    // If Time is Up, Stop the Timer and Open A Modal
    if (seconds === 0) {
      clearInterval(timer);
      openModal();
    }
  }

  // Controls to Set Time and Stop the Timer
  const setTimer = () => {setSeconds(inputSeconds + (inputMinutes * 60))}
  const stopTimer = () => {clearInterval(timer)}

  // Take User Input Time
  const updateSeconds = (event) => {setInputSeconds(event.target.value)}
  const updateMinutes = (event) => {setInputMinutes(event.target.value)}

  return (
    <div>
      <div id="mainContent" className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">Pomodoro Timer</p>
            </div>
          </div>
          <div className="controls">
            <div className="field-group flex">
              <input className="input" type="text" value={inputMinutes} onChange={updateMinutes}/>
              &nbsp;
              <input className="input" type="text" value={inputSeconds} onChange={updateSeconds}/>
            </div>
            <br></br>
            <div className="buttons">
              <button className="button is-link is-focused" onClick={setTimer}>Set Timer</button>
              <button className="button is-primary is-focused" onClick={startTimer}>Start Timer</button>
              <button className="button is-danger is-focused" onClick={stopTimer}>Stop Timer</button>
            </div>
          </div>

          <div className="content">
            {Math.floor(seconds / 60)} : {("0" + (seconds % 60)).slice(-2)}
          </div>
        </div>
      </div>

      <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">

        <div class="card">
          <div class="card-content">
            <div class="content" style={{fontSize: '1.5rem'}}>
            🍅Your timer has complete. Take 5 minutes to relax!🍅
              <br></br>
            </div>
          </div>
        </div>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick={closeModal}></button>
      </div>
    </div>
  );
}

const closeModal = () => {
  var element = document.getElementById("modal");
  element.classList.remove("is-active");
}

const openModal = () => {
  var element = document.getElementById("modal");
  element.classList.add("is-active");
}

export default Timer;
