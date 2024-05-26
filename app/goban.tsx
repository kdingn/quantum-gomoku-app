import "./global.css";
import Gotile from "./gotile";

function Goban() {
  const gobanSize = 13;
  const gobanDocument = [];
  for (let i = 1; i <= gobanSize; i++) {
    var gobanRow = [];
    for (let j = 1; j <= gobanSize; j++) {
      gobanRow.push(
        <td key={j}>
          <div className="goban-tile">
            <Gotile vindex={i} hindex={j} gobanSize={gobanSize} />
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
