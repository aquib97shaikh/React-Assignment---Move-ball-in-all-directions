import React, { Component, useState, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [renderBall, setRenderBall] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [ballPosition, setBallPosition] = useState({
    left: "0px",
    top: "0px",
  });

  const reset = () => {
    setRenderBall(false);
    setX(0);
    setY(0);
    setBallPosition({
      left: "0px",
      top: "0px",
    });
  };

  const ball = () => {
    return <div className="ball" style={ballPosition}></div>;
  };
  const setx = (tx, ty) => {
    setX(tx);
    setY(ty);
    setBallPosition({
      left: tx + "px",
      top: ty + "px",
    });
  };

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      let tempX = x,
        tempY = y;
      let ALLOWED_KEYS = {
        ArrowUp: () => (tempY = tempY - 5),
        ArrowDown: () => (tempY = tempY + 5),
        ArrowLeft: () => (tempX = tempX - 5),
        ArrowRight: () => (tempX = tempX + 5),
      };
      renderBall && key in ALLOWED_KEYS && ALLOWED_KEYS[key]();
      setx(tempX, tempY);
      console.log(ballPosition);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [setx]);

  const renderChoice = () => {
    return renderBall ? (
      ball()
    ) : (
      <button onClick={() => setRenderBall(true)} className="start">
        Start
      </button>
    );
  };

  return (
    <div className="playground">
      <button onClick={reset} className="reset">
        Reset
      </button>
      {renderChoice()}
    </div>
  );
};

export default App;
