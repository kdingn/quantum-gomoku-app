import Gotile from "@/components/gotile";
import { db } from "@/firebase/firebase";
import "@/styles/global.css";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Goban() {
  const [sequence, setSequence] = useState([]);
  const [error, setError] = useState(null);
  const matchId = useSearchParams().get("id");
  useEffect(() => {
    async function fetchData() {
      try {
        if (!matchId) {
          setError("Match ID is not designated");
          return;
        }
        const data = collection(db, `match-${matchId}`);
        if ((await getDocs(data)).empty) {
          setError("Match is not found");
          return;
        }
        const q = query(data, orderBy("timestamp", "asc"));
        onSnapshot(q, (querySnapshot) => {
          setSequence(querySnapshot.docs.map((doc) => doc.data()));
        });
      } catch (error) {
        setError("Error occurred in connection");
      }
    }
    fetchData();
  }, []);
  if (error) {
    return <div>{error}</div>;
  }

  const positionProbMap = {};
  sequence.forEach((item) => {
    const key = `${item.i}-${item.j}`;
    positionProbMap[key] = item.prob;
  });

  const nextProbDict = {
    70: 10,
    10: 90,
    90: 30,
    30: 70,
  };
  function addSequence(vindex, hindex) {
    const lastProb = sequence.length !== 0 ? sequence.slice(-1)[0]["prob"] : 30;
    const newPoint = {
      i: vindex,
      j: hindex,
      prob: nextProbDict[lastProb],
      timestamp: serverTimestamp(),
    };
    setSequence([...sequence, newPoint]);
    addDoc(collection(db, `match-${matchId}`), newPoint);
  }

  const gobanSize = 13;
  const gobanDocument = [];
  for (let i = 1; i <= gobanSize; i++) {
    var gobanRow = [];
    for (let j = 1; j <= gobanSize; j++) {
      const key = `${i}-${j}`;
      const prob = positionProbMap[key] || null;
      gobanRow.push(
        <td key={j}>
          <div
            className="goban-tile"
            onClick={prob === null ? () => addSequence(i, j) : () => null}
          >
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
