"use client";

import Goban from "@/components/goban";
import GoStone from "@/components/goicons/go_stone";

import { db } from "@/libs/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const size = 28;
  const matchId = useSearchParams().get("id");
  const username = sessionStorage.getItem("username");
  const [blackColor, setBlackColor] = useState("");
  const [whiteColor, setWhiteColor] = useState("");
  const [showWinner, setShowWinner] = useState(true);
  const [yourTurn, setYourTurn] = useState(false);
  const [nextProbability, setNextProbability] = useState(70);
  const [nextStoneColor, setNextStoneColor] = useState("");
  const [nextTextColor, setNextTextColor] = useState("");
  const [matchDocId, setMatchDocId] = useState("");
  const [match, setMatch] = useState({ black: "", white: "", win: "" });
  const nextProbDict = {
    70: 10,
    10: 90,
    90: 30,
    30: 70,
  };

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setBlackColor(rootStyles.getPropertyValue("--black-color").trim());
    setWhiteColor(rootStyles.getPropertyValue("--white-color").trim());

    function fetchMatch() {
      const q = query(
        collection(db, "matches"),
        where("id", "==", Number(matchId))
      );
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setMatch(doc.data());
          setMatchDocId(doc.id);
        });
      });
    }
    fetchMatch();

    function fetchSequence() {
      const q = query(
        collection(db, "sequences"),
        where("id", "==", Number(matchId))
      );
      onSnapshot(q, (querySnapshot) => {
        const probability = querySnapshot.docs.map((doc) => doc.data())[0]
          .probability;
        if (probability.length !== 0) {
          setNextProbability(nextProbDict[probability.slice(-1)[0]]);
        }
      });
    }
    fetchSequence();
  }, [matchId]);

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    if (nextProbability > size * 2) {
      setNextStoneColor(rootStyles.getPropertyValue("--black-color").trim());
      setNextTextColor(rootStyles.getPropertyValue("--white-color").trim());
      if (username === match.black && match.win === "") {
        setYourTurn(true);
      } else {
        setYourTurn(false);
      }
    } else {
      setNextStoneColor(rootStyles.getPropertyValue("--white-color").trim());
      setNextTextColor(rootStyles.getPropertyValue("--black-color").trim());
      if (username === match.white && match.win === "") {
        setYourTurn(true);
      } else {
        setYourTurn(false);
      }
    }
  }, [match, nextProbability]);

  function clickSurrender() {
    if (yourTurn) {
      const docRef = doc(db, "matches", matchDocId);
      const opponent = username === match.black ? match.white : match.black;
      updateDoc(docRef, {
        win: opponent,
        status: "close",
      });
    }
  }

  function clickMeasure() {
    if (yourTurn) {
      console.log("aaa");
    }
  }

  return (
    <div>
      {match.win !== "" && showWinner && (
        <div className="show-winner-cotainer">
          <div className="show-winner" onClick={() => setShowWinner(false)}>
            <div className="show-winner-text">WINNER : {match.win}</div>
          </div>
        </div>
      )}
      <div className="match-player-names">
        <div className="match-player-name-content">
          <GoStone
            size={size}
            outlineColor={blackColor}
            circleColor={blackColor}
          />
          <h3>{match.black}</h3>
        </div>
        <div className="match-player-name-content">
          <h3>{match.white}</h3>
          <GoStone
            size={size}
            outlineColor={blackColor}
            circleColor={whiteColor}
          />
        </div>
      </div>
      <div className="goban-container">
        <Goban yourTurn={yourTurn} />
      </div>
      <div className="match-functions">
        <div className="match-function-small">
          <div className="match-function-next">next</div>
          <div className="match-function-next-content">
            <GoStone
              size={55}
              text={String(nextProbability)}
              outlineColor={blackColor}
              circleColor={nextStoneColor}
              textColor={nextTextColor}
            ></GoStone>
          </div>
        </div>
        <div className="match-function-large">
          <div className="match-function-measure" onClick={clickMeasure}>
            <h3>Measure Stones</h3>
          </div>
        </div>
        <div className="match-function-small">
          <div className="match-function-surrender" onClick={clickSurrender}>
            Surrender
          </div>
        </div>
      </div>
    </div>
  );
}
