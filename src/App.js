import React, { useEffect, useState } from "react";
import StopWatch from "./Stopwatch";
// import Timer from "./Timer";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (time === 0) {
          clearInterval(interval);
          setIsRunning(false);
          return;
        }
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleDarkTheme = () => {
    const body = document.querySelector("body");
    darkTheme ? body.classList.add("dark") : body.classList.remove("dark");
    setDarkTheme(!darkTheme);
  };

  return (
    <div className="App">
      <div className="top">
        <span className="moon" onClick={handleDarkTheme}>
          {darkTheme ? "light" : "dark"}
        </span>
      </div>
      {/* stop watch */}
      <StopWatch />
      <h3>Count Down StopWatch</h3>
      <input type="number" value={time} onChange={handleChange} />
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
      {/* count down timer */}
      {/* <Timer /> */}
    </div>
  );
}

export default App;
