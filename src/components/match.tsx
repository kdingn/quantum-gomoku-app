import { db } from "@/libs/firebase";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Match(props: {
  match: DocumentData;
  docid: string;
  isYouHaveMatch: boolean;
  key: string;
}) {
  const username = sessionStorage.getItem("username");
  const router = useRouter();
  const match = props.match;
  const users = _.shuffle([username, props.match.owner]);
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    try {
      setDate(props.match.create.toDate());
    } catch {}
  }, [props]);

  function routeMatch() {
    router.push(`/match?id=${match.id}`);
  }

  async function joinMatch() {
    if (props.isYouHaveMatch) {
      alert("You already have or be in a match.");
    } else {
      const docRef = doc(db, "matches", props.docid);
      updateDoc(docRef, {
        black: users[0],
        white: users[1],
        status: "progress",
      });

      await addDoc(collection(db, "sequences"), {
        id: match.id,
        i: [],
        j: [],
        probability: [],
        timestamp: [],
      });

      routeMatch();
    }
  }

  function deleteMatch(e: React.MouseEvent<HTMLDivElement>) {
    deleteDoc(doc(db, "matches", props.docid));
    e.stopPropagation();
  }

  return (
    <div className="home-content-matchinfo-wrapper">
      {match.status === "progress" ? (
        <div className="home-content-matchinfo-progress" onClick={routeMatch}>
          {date && (
            <span className="home-content-matchinfo-timestamp">
              {`${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}
              , #{match.id}
            </span>
          )}
          <div className="home-content-matchinfo-title">
            <span className="home-content-matchinfo-player">{match.black}</span>
            <span className="home-content-matchinfo-vs">vs</span>
            <span className="home-content-matchinfo-player">{match.white}</span>
          </div>
        </div>
      ) : (
        <div className="home-content-matchinfo-open" onClick={joinMatch}>
          {date && (
            <span className="home-content-matchinfo-timestamp">
              {`${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}
              , #{match.id}
            </span>
          )}
          <div className="home-content-matchinfo-title">
            Join&nbsp;
            <div className="home-content-matchinfo-player-open">
              {match.owner}
            </div>
            &apos;s match
            {username === props.match.owner && (
              <div
                className="home-content-matchinfo-button"
                onClick={deleteMatch}
              >
                <CancelIcon />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
