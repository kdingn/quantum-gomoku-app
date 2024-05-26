"use client";

import { useLayoutEffect, useState } from "react";
import Gole from "./goicons/go_le";
import Goll from "./goicons/go_ll";
import Golo from "./goicons/go_lo";
import Golr from "./goicons/go_lr";
import Gono from "./goicons/go_no";
import Gori from "./goicons/go_ri";
import Goul from "./goicons/go_ul";
import Goup from "./goicons/go_up";
import Gour from "./goicons/go_ur";

function Gotile(props) {
  const defaultTileSize = 40;

  const [boardColor, setBoardColor] = useState("");
  const [lineColor, setLineColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [circleColor, setCircleColor] = useState("");
  const [tileSize, setTileSize] = useState(defaultTileSize);

  useLayoutEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setBoardColor(rootStyles.getPropertyValue("--board-color").trim());
    setLineColor(rootStyles.getPropertyValue("--line-color").trim());
    if (props.prob > 50) {
      setCircleColor(rootStyles.getPropertyValue("--black-color").trim());
      setTextColor(rootStyles.getPropertyValue("--white-color").trim());
    } else {
      setCircleColor(rootStyles.getPropertyValue("--white-color").trim());
      setTextColor(rootStyles.getPropertyValue("--black-color").trim());
    }

    const handleResize = () => {
      const maxTileWidth = (window.innerWidth - 5 * 2) / props.gobanSize;
      if (maxTileWidth < defaultTileSize) {
        setTileSize(maxTileWidth);
      } else {
        setTileSize(defaultTileSize);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props.gobanSize, defaultTileSize]);

  if (props.vindex === 1 && props.hindex === 1) {
    return (
      <Goul
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  } else if (props.vindex === 1 && props.hindex === props.gobanSize) {
    return (
      <Gour
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  } else if (props.vindex === props.gobanSize && props.hindex === 1) {
    return (
      <Goll
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  } else if (
    props.vindex === props.gobanSize &&
    props.hindex === props.gobanSize
  ) {
    return (
      <Golr
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  } else if (props.vindex === 1) {
    return (
      <Goup
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  } else if (props.hindex === 1) {
    return (
      <Gole
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  } else if (props.hindex === props.gobanSize) {
    return (
      <Gori
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  } else if (props.vindex === props.gobanSize) {
    return (
      <Golo
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  } else {
    return (
      <Gono
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  }
}

export default Gotile;
