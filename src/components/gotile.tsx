import Gole from "@/components/goicons/go_le";
import Goll from "@/components/goicons/go_ll";
import Golo from "@/components/goicons/go_lo";
import Golr from "@/components/goicons/go_lr";
import Gono from "@/components/goicons/go_no";
import Gori from "@/components/goicons/go_ri";
import Goul from "@/components/goicons/go_ul";
import Goup from "@/components/goicons/go_up";
import Gour from "@/components/goicons/go_ur";
import { useEffect, useState } from "react";

export default function Gotile(props: {
  vindex: number;
  hindex: number;
  gobanSize: number;
  prob: number | null;
}) {
  const defaultTileSize = 40;

  const [boardColor, setBoardColor] = useState("");
  const [lineColor, setLineColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [circleColor, setCircleColor] = useState("");
  const [tileSize, setTileSize] = useState(defaultTileSize);

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setBoardColor(rootStyles.getPropertyValue("--board-color").trim());
    setLineColor(rootStyles.getPropertyValue("--line-color").trim());
    if (props.prob !== null && props.prob > 50) {
      setCircleColor(rootStyles.getPropertyValue("--black-color").trim());
      setTextColor(rootStyles.getPropertyValue("--white-color").trim());
    } else {
      setCircleColor(rootStyles.getPropertyValue("--white-color").trim());
      setTextColor(rootStyles.getPropertyValue("--black-color").trim());
    }

    const handleResize = () => {
      const maxTileWidth = (window.outerWidth - 5 * 2) / props.gobanSize;
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
  }, [props]);

  if (props.vindex === 1 && props.hindex === 1) {
    return (
      <Goul
        lineColor={lineColor}
        backgroundColor={boardColor}
        size={tileSize}
        text={props.prob ? String(props.prob) : ""}
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
        text={props.prob ? String(props.prob) : ""}
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
        text={props.prob ? String(props.prob) : ""}
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
        text={props.prob ? String(props.prob) : ""}
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
        text={props.prob ? String(props.prob) : ""}
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
        text={props.prob ? String(props.prob) : ""}
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
        text={props.prob ? String(props.prob) : ""}
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
        text={props.prob ? String(props.prob) : ""}
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
        text={props.prob ? String(props.prob) : ""}
        textColor={textColor}
        circleColor={circleColor}
      />
    );
  }
}
