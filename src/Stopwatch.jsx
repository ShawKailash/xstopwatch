import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  // State to track time (in seconds)
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // To track if the stopwatch is running

  // Function to start or stop the timer
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time by 1 second
      }, 1000);
    }
    setIsRunning(!isRunning); // Toggle running state
  };

  // Function to reset the timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0); // Reset the time
    setIsRunning(false); // Reset running state
  };

  // UseRef to hold the interval id for clearing it later
  const intervalRef = React.useRef(null);

  // Clean up the interval on component unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format time to minutes:seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      <p>Time: {formatTime(time)}</p>
      
      <div className="buttons">
        {/* Start/Stop Button */}
        <button onClick={toggleTimer}>{isRunning ? "Stop" : "Start"}

        </button>
        {/* Reset Button */}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;