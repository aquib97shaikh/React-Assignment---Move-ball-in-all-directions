import React, { Component, useState, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [renderBall, setRenderBall] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const mazeUrl = [
    "https://freesvg.org/img/simplemaze.png",
    "https://scipython.com/static/media/uploads/blog/df_maze/df_maze2.png",
    "https://cdn.iconscout.com/icon/premium/png-256-thumb/classical-maze-15-1128154.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbBNRq--NVqKQiBaeGc0pjnwOoi5XNMsyLjw&usqp=CAU",
    "https://he-s3.s3.amazonaws.com/media/uploads/5288d3f.jpg",
  ];
  const [mazeI, setMazeI] = useState(0);
  const [lines, setLines] = useState([]);
  const ballOffSet = 12;
  const [ballPosition, setBallPosition] = useState({
    left: "0px",
    top: "0px",
  });

  const reset = () => {
    setRenderBall(false);
    setX(0);
    setY(0);
    setLines([]);
    setBallPosition({
      left: "0px",
      top: "0px",
    });
  };

  const ball = () => {
    return (
      <div>
        <img src={mazeUrl[mazeI]} className="maze" />
        <div className="ball" style={ballPosition}></div>
        {showLine()}
      </div>
    );
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
        tempY = y,
        ALLOWED_KEYS = {
          ArrowUp: () => (tempY = tempY - 5),
          ArrowDown: () => (tempY = tempY + 5),
          ArrowLeft: () => (tempX = tempX - 5),
          ArrowRight: () => (tempX = tempX + 5),
        };
      renderBall && key in ALLOWED_KEYS && ALLOWED_KEYS[key]();
      let l = lines;
      l.push(
        <line
          key={lines.length}
          x1={ballOffSet + x}
          x2={ballOffSet + tempX}
          y1={ballOffSet + y}
          y2={ballOffSet + tempY}
        ></line>
      );
      setLines(l);
      setx(tempX, tempY);
      console.log(ballPosition);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setx]);
  const clicked = () => {
    console.log("click");
    setRenderBall(true);
    setMazeI(Math.floor(Math.random() * mazeUrl.length));
  };

  const renderChoice = () => {
    return renderBall ? (
      ball()
    ) : (
      <button onClick={clicked} className="start">
        Start
      </button>
    );
  };
  const showLine = () => {
    console.log("svg");
    return <svg className="lines">{lines}</svg>;
  };

  return (
    <div className="playground">
      {renderChoice()}
      <button onClick={reset} className="reset">
        Reset
      </button>
    </div>
  );
};

export default App;
