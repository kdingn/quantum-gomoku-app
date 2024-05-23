"use client";

import { useEffect, useState } from "react";
import "./global.css";
import GoIcon from "./goicons/go_-";

function Goban() {
  const [boardColor, setBoardColor] = useState("");
  const [lineColor, setLineColor] = useState("");

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const boardColor = rootStyles.getPropertyValue("--board-color").trim();
    const lineColor = rootStyles.getPropertyValue("--line-color").trim();
    setBoardColor(boardColor);
    setLineColor(lineColor);
  }, []);

  return (
    <div>
      <div>gobannnnnn</div>
      <div>
        <GoIcon line={lineColor} background={boardColor} />
      </div>
    </div>
  );
}

export default Goban;
