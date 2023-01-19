import React, { useEffect, useState } from "react";
// import "./styles.css";

export default function Timer() {
  const [time, setTime] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        const [hours, minutes, seconds] = time.split(":");
        const newSeconds = parseInt(seconds) - 1;
        if (newSeconds < 0) {
          const newMinutes = parseInt(minutes) - 1;
          if (newMinutes < 0) {
            const newHours = parseInt(hours) - 1;
            if (newHours < 0) {
              clearInterval(interval);
              setIsRunning(false);
              return;
            }
            setTime(`${newHours}:59:59`);
          } else {
            setTime(`${hours}:${newMinutes}:59`);
          }
        } else {
          setTime(`${hours}:${minutes}:${newSeconds}`);
        }
      }, 1000);
    } else if (!isRunning && time !== "00:00:00") {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  //   const handleStart = () => {
  //     if (isRunning) return;

  //     const id = setInterval(() => {
  //       const [hours, minutes, seconds] = time.split(":");
  //       const newSeconds = parseInt(seconds) - 1;
  //       if (newSeconds < 0) {
  //         const newMinutes = parseInt(minutes) - 1;
  //         if (newMinutes < 0) {
  //           const newHours = parseInt(hours) - 1;
  //           if (newHours < 0) {
  //             clearInterval(id);
  //             setIsRunning(false);
  //             return;
  //           }
  //           setTime(`${newHours}:59:59`);
  //         } else {
  //           setTime(`${hours}:${newMinutes}:59`);
  //         }
  //       } else {
  //         setTime(`${hours}:${minutes}:${newSeconds}`);
  //       }
  //     }, 1000);

  //     setIntervalId(id);
  //     setIsRunning(true);
  //   };

  const handleReset = () => {
    setTime("00:00:00");
  };

  return (
    <div className="Timer">
      <h2>Count Down Timer</h2>
      <input type="text" value={time} onChange={handleChange} />
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
