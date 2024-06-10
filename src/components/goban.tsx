import Gotile from "@/components/gotile";
import { db } from "@/libs/firebase";
import {
  doc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Goban() {
  const [positionProbMap, setPositionProbMap] = useState({});
  const [sequence, setSequence] = useState();
  const [error, setError] = useState(null);
  const [docid, setDocid] = useState();
  const matchId = useSearchParams().get("id");
  useEffect(() => {
    async function fetchData() {
      try {
        if (!matchId) {
          setError("Match ID is Not Designated");
          return;
        }

        const q = query(
          collection(db, "sequences"),
          where("id", "==", Number(matchId))
        );
        onSnapshot(q, (querySnapshot) => {
          const docRef = querySnapshot.docs[0];
          setSequence(docRef.data());
          setDocid(docRef.id);
        });
      } catch (error) {
        setError("Error Occurred in Connection");
      }
    }
    fetchData();
  }, []);
  if (error) {
    return <div>{error}</div>;
  }

  useEffect(() => {
    if (sequence) {
      const map = {};
      for (let n = 0; n < sequence.probability.length; n++) {
        const key = `${sequence.i[n]}-${sequence.j[n]}`;
        map[key] = sequence.probability[n];
      }
      setPositionProbMap(map);
    }
  }, [sequence]);

  const nextProbDict = {
    70: 10,
    10: 90,
    90: 30,
    30: 70,
  };
  function addSequence(vindex, hindex) {
    const lastProb =
      sequence.probability.length !== 0
        ? sequence.probability.slice(-1)[0]
        : 30;
    const timestamp = Date.now();
    const docRef = doc(db, "sequences", docid);
    updateDoc(docRef, {
      i: [...sequence.i, vindex],
      j: [...sequence.j, hindex],
      probability: [...sequence.probability, nextProbDict[lastProb]],
      timestamp: [...sequence.timestamp, timestamp],
    });
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
