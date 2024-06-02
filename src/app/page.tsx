"use client";

import { db } from "@/libs/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const username = sessionStorage.getItem("username");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, "matches"), orderBy("update", "desc"));
      onSnapshot(q, (querySnapshot) => {
        setMatches(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
    fetchData();
  }, []);

  const matchesDocument = [];
  matches.forEach((match) => {
    const date = match.update.toDate();
    matchesDocument.push(
      <div className="home-content-matchinfo-wrapper">
        <div className="home-content-matchinfo">
          <span className="home-content-matchinfo-timestamp">
            {`${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}
            , #{match.id}
          </span>
          <div className="home-content-matchinfo-title">
            <span className="home-content-matchinfo-player">{match.black}</span>
            <span className="home-content-matchinfo-vs">vs</span>
            <span className="home-content-matchinfo-player">{match.white}</span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="fixed-contents">
        <div>login : {username}</div>
        <div className="home-content">
          <span className="home-content-description">*now in preparing...</span>
          <div className="home-content-center">
            <span className="home-content-title">Play Game with AI</span>
          </div>
        </div>
        <div className="home-content">
          <div className="home-content-center">
            <span className="home-content-title">Create Match</span>
          </div>
        </div>
        <div className="home-content-matches-title">Matches</div>
      </div>
      <div>{matchesDocument}</div>
    </div>
  );
}
