"use client";

import { useEffect, useState } from "react";
import "./global.css";
import IconBoardDiagram from "./goicons/go_board_diagram_image";

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

  const tileSize = 40;
  const gobanSize = 9;
  const gobanDocument = [];
  for (let i = 1; i <= gobanSize; i++) {
    var gobanRow = [];
    for (let j = 1; j <= gobanSize; j++) {
      gobanRow.push(
        <td key={j}>
          <IconBoardDiagram
            line={lineColor}
            background={boardColor}
            size={tileSize}
          />
        </td>
      );
    }
    gobanDocument.push(<tr key={i}>{gobanRow}</tr>);
  }

  return (
    <table className="goban">
      <tbody>{gobanDocument}</tbody>
    </table>
  );
}

export default Goban;
