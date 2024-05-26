"use client";

import { useEffect, useState } from "react";
import Godot from "./goicons/go_dot";
import Gole from "./goicons/go_le";
import Goll from "./goicons/go_ll";
import Golo from "./goicons/go_lo";
import Golr from "./goicons/go_lr";
import Gori from "./goicons/go_ri";
import Goul from "./goicons/go_ul";
import Goup from "./goicons/go_up";
import Gour from "./goicons/go_ur";

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
  } else if (props.vindex === 1 && props.hindex === props.gobanSize) {
    return <Gour line={lineColor} background={boardColor} size={tileSize} />;
  } else if (props.vindex === props.gobanSize && props.hindex === 1) {
    return <Goll line={lineColor} background={boardColor} size={tileSize} />;
  } else if (
    props.vindex === props.gobanSize &&
    props.hindex === props.gobanSize
  ) {
    return <Golr line={lineColor} background={boardColor} size={tileSize} />;
  } else if (props.vindex === 1) {
    return <Goup line={lineColor} background={boardColor} size={tileSize} />;
  } else if (props.hindex === 1) {
    return <Gole line={lineColor} background={boardColor} size={tileSize} />;
  } else if (props.hindex === props.gobanSize) {
    return <Gori line={lineColor} background={boardColor} size={tileSize} />;
  } else if (props.vindex === props.gobanSize) {
    return <Golo line={lineColor} background={boardColor} size={tileSize} />;
  } else {
    return <Godot line={lineColor} background={boardColor} size={tileSize} />;
  }
}

export default Gotile;
