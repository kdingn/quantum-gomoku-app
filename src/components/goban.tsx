import { getDataFromFirestore } from "../firebase/reader";
import "../styles/global.css";
import Gotile from "./gotile";

async function Goban() {
  const sequence = await getDataFromFirestore("match-00000");
  const positionProbMap = {};
  sequence.forEach((item) => {
    const key = `${item.i}-${item.j}`;
    positionProbMap[key] = item.prob;
  });

  const gobanSize = 13;
  const gobanDocument = [];
  for (let i = 1; i <= gobanSize; i++) {
    var gobanRow = [];
    for (let j = 1; j <= gobanSize; j++) {
      const key = `${i}-${j}`;
      const prob = positionProbMap[key] || null;
      gobanRow.push(
        <td key={j}>
          <div className="goban-tile">
            <Gotile vindex={i} hindex={j} gobanSize={gobanSize} prob={prob} />
          </div>
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
