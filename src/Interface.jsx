import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

const Interface = () => {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const controls = useKeyboardControls((state) => state);
  const time = useRef();

  useEffect(() => {
    const unsubEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = `Time: ${elapsedTime}s`;
      }
    });

    return () => {
      unsubEffect();
    };
  }, []);

  return (
    <div className="interface">
      <div className="time" ref={time}>
        Time
      </div>
      {phase === "ended" && (
        <div className="restart" onClick={() => restart()}>
          Restart
        </div>
      )}

      <div className="interface">
        {/* ... */}

        {/* Controls */}
        <div className="controls">
          <div className="raw">
            <div className={`key ${controls.forward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key ${controls.left ? "active" : ""}`}></div>
            <div className={`key ${controls.backward ? "active" : ""}`}></div>
            <div className={`key ${controls.right ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key large ${controls.jump ? "active" : ""}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
