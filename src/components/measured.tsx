import Gotile from "@/components/gotile";
import { db } from "@/libs/firebase";
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Goban() {
  const [positionProbMap, setPositionProbMap] = useState<{
    [key: string]: number;
  }>({});
  const [match, setMatch] = useState<DocumentData>();
  const [error, setError] = useState("");
  const matchId = useSearchParams().get("id");
  useEffect(() => {
    async function fetchData() {
      try {
        if (!matchId) {
          setError("Match ID is Not Designated");
          return;
        }

        const q = query(
          collection(db, "matches"),
          where("id", "==", Number(matchId))
        );
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setMatch(doc.data());
          });
        });
      } catch (error) {
        setError("Error Occurred in Connection");
      }
    }
    fetchData();
  }, [matchId]);

  useEffect(() => {
    if (match) {
      const map: { [key: string]: number } = {};
      for (let n = 0; n < match.measuredValue.length; n++) {
        const key = `${match.measuredI[n]}-${match.measuredJ[n]}`;
        map[key] = match.measuredValue[n];
      }
      setPositionProbMap(map);
    }
  }, [match]);

  const gobanSize = 13;
  const gobanDocument = [];
  for (let i = 1; i <= gobanSize; i++) {
    var gobanRow = [];
    for (let j = 1; j <= gobanSize; j++) {
      const key = `${i}-${j}`;
      const prob = positionProbMap[key];
      gobanRow.push(
        <td key={j}>
          {prob === undefined ? (
            <div className="goban-tile-cursor">
              <Gotile
                vindex={i}
                hindex={j}
                gobanSize={gobanSize}
                prob={prob}
                onlyStone={true}
              />
            </div>
          ) : (
            <div className="goban-tile">
              <Gotile
                vindex={i}
                hindex={j}
                gobanSize={gobanSize}
                prob={prob}
                onlyStone={true}
              />
            </div>
          )}
        </td>
      );
    }
    gobanDocument.push(<tr key={i}>{gobanRow}</tr>);
  }

  if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <table className="goban">
        <tbody>{gobanDocument}</tbody>
      </table>
    );
  }
}
