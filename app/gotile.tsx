"use client";

import { useEffect, useState } from "react";
import Godot from "./goicons/go_dot";
import Goul from "./goicons/go_ul";

function Gotile(props) {
  const [boardColor, setBoardColor] = useState("");
  const [lineColor, setLineColor] = useState("");
  const tileSize = 40;

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const boardColor = rootStyles.getPropertyValue("--board-color").trim();
    const lineColor = rootStyles.getPropertyValue("--line-color").trim();
    setBoardColor(boardColor);
    setLineColor(lineColor);
  }, []);

  if (props.vindex === 1 && props.hindex === 1) {
    return <Goul line={lineColor} background={boardColor} size={tileSize} />;
  } else {
    return <Godot line={lineColor} background={boardColor} size={tileSize} />;
  }
}

export default Gotile;
