import React, { useState, useRef, useEffect } from "react";
import "./Timer.css";

function Timer() {
  const timerRef = useRef(null);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  function startTimer() {
    if (timerRef.current) return; // Prevent multiple intervals

    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          openModal();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
  }

  function pauseTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsPaused(true);
    }
  }

  const setTimer = () => {
    setSeconds(inputMinutes * 60 + parseInt(inputSeconds));
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setSeconds(1);
    openModal();
  };

  const updateSeconds = (event) => {
    setInputSeconds(event.target.value);
  };

  const updateMinutes = (event) => {
    setInputMinutes(event.target.value);
  };

  useEffect(() => {
    setTimer();
  }, []);

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
              <input className="input" type="text" value={inputMinutes} onChange={updateMinutes} />
              &nbsp;
              <input className="input" type="text" value={inputSeconds} onChange={updateSeconds} />
            </div>
            <br></br>
            <div className="buttons">
              <button className="button is-link is-focused" onClick={setTimer}>
                Set Timer
              </button>
              <button className="button is-primary is-focused" onClick={startTimer}>
                {isPaused ? "Resume Timer" : "Start Timer"}
              </button>
              <button className="button is-warning is-focused" onClick={pauseTimer}>
                Pause Timer
              </button>
              <button className="button is-danger is-focused" onClick={stopTimer}>
                Stop Timer
              </button>
            </div>
          </div>

          <div className="content">
            {Math.floor(seconds / 60)} : {("0" + (seconds % 60)).slice(-2)}
          </div>
        </div>
      </div>

      <div id="modal" className="modal">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              <div className="content" style={{ fontSize: "1.5rem" }}>
                🍅Your timer has complete. Take 5 minutes to relax!🍅
                <br></br>
              </div>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
      </div>
    </div>
  );
}

const closeModal = () => {
  var element = document.getElementById("modal");
  element.classList.remove("is-active");
};

const openModal = () => {
  var element = document.getElementById("modal");
  element.classList.add("is-active");
};

export default Timer;
