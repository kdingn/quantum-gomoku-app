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
        <table className="goban">
          <tbody>
            <tr>
              <td>
                <GoIcon line={lineColor} background={boardColor} />
              </td>
              <td>
                <GoIcon line={lineColor} background={boardColor} />
              </td>
            </tr>
            <tr>
              <td>
                <GoIcon line={lineColor} background={boardColor} />
              </td>
              <td>
                <GoIcon line={lineColor} background={boardColor} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Goban;
