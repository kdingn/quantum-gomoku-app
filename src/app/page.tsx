"use client";

import { db } from "@/libs/firebase";
import {
  and,
  collection,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Match from "@/components/match";

export default function Home() {
  const username = sessionStorage.getItem("username");
  const [yourMatch, setYourMatch] = useState([]);
  const [openMatches, setOpenMatches] = useState([]);

  useEffect(() => {
    async function fetchYourMatch() {
      const q = query(
        collection(db, "matches"),
        or(
          and(where("status", "==", "open"), where("owner", "==", username)),
          and(
            where("status", "==", "progress"),
            or(where("black", "==", username), where("white", "==", username))
          )
        )
      );
      onSnapshot(q, (querySnapshot) => {
        setYourMatch(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
    fetchYourMatch();

    async function fetchOpenMatches() {
      const q = query(
        collection(db, "matches"),
        where("status", "==", "open"),
        orderBy("update", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        setOpenMatches(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
    fetchOpenMatches();
  }, []);

  const yourMatchDocument = [];
  yourMatch.forEach((match) => {
    yourMatchDocument.push(<Match match={match} key={match.id} />);
  });

  const openMatchesDocument = [];
  openMatches.forEach((match) => {
    openMatchesDocument.push(<Match match={match} key={match.id} />);
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
        {yourMatch.length !== 0 && (
          <div className="home-content-matches-title">Your Match</div>
        )}
        <div>{yourMatchDocument}</div>
        <div className="home-content-matches-title">Open Matches</div>
      </div>
      <div>{openMatchesDocument}</div>
    </div>
  );
}
