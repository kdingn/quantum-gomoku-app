"use client";

import Goban from "@/components/goban";
import GoBlack from "@/components/goicons/go_stone";

import { db } from "@/libs/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const size = 28;
  const [blackPlayer, setBlackPlayer] = useState("");
  const [whitePlayer, setWhitePlayer] = useState("");
  const [blackColor, setBlackColor] = useState("");
  const [whiteColor, setWhiteColor] = useState("");
  const matchId = useSearchParams().get("id");

  useEffect(() => {
    const q = query(
      collection(db, "matches"),
      where("id", "==", Number(matchId))
    );
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setBlackPlayer(doc.data().black);
        setWhitePlayer(doc.data().white);
      });
    });

    const rootStyles = getComputedStyle(document.documentElement);
    setBlackColor(rootStyles.getPropertyValue("--black-color").trim());
    setWhiteColor(rootStyles.getPropertyValue("--white-color").trim());
  }, [matchId]);

  return (
    <div>
      <div className="match-player-names">
        <div className="match-player-name-content">
          <GoBlack
            size={size}
            outlineColor={blackColor}
            circleColor={blackColor}
          />
          <h3>{blackPlayer}</h3>
        </div>
        <div className="match-player-name-content">
          <h3>{whitePlayer}</h3>
          <GoBlack
            size={size}
            outlineColor={blackColor}
            circleColor={whiteColor}
          />
        </div>
      </div>
      <div className="goban-container">
        <Goban />
      </div>
    </div>
  );
}
