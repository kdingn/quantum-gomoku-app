"use client";

import Match from "@/components/match";
import { db } from "@/libs/firebase";
import {
  DocumentData,
  addDoc,
  and,
  collection,
  doc,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface MatchData {
  docid: string;
  doc: DocumentData;
}

export default function Home() {
  const username = sessionStorage.getItem("username");
  const [openMatches, setOpenMatches] = useState<MatchData[]>([]);
  const [yourMatch, setYourMatch] = useState<MatchData[]>([]);
  const [isYouHaveMatch, setIsYouHaveMatch] = useState(false);
  const [maxMatchId, setMaxMatchId] = useState<number | undefined>(undefined);
  const [standardMessage, setStandardMessage] = useState("");

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
        setYourMatch(
          querySnapshot.docs.map((doc) => ({ docid: doc.id, doc: doc.data() }))
        );
      });
    }
    fetchYourMatch();

    async function fetchOpenMatches() {
      const q = query(
        collection(db, "matches"),
        where("status", "==", "open"),
        orderBy("create", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        setOpenMatches(
          querySnapshot.docs.map((doc) => ({ docid: doc.id, doc: doc.data() }))
        );
      });
    }
    fetchOpenMatches();

    async function fetchMaxMatchId() {
      const docRef = doc(db, "variables", "max-match-id");
      onSnapshot(docRef, (docSnapshot) => {
        const data = docSnapshot.data();
        setMaxMatchId(data.value);
      });
    }
    fetchMaxMatchId();
  }, []);

  useEffect(() => {
    setIsYouHaveMatch(yourMatch.length !== 0);
  }, [yourMatch]);

  useEffect(() => {
    if (openMatches.length === 0) {
      setStandardMessage("No Match Found");
    } else {
      setStandardMessage("");
    }
  }, [openMatches]);

  const yourMatchDocument = [];
  yourMatch.forEach((match) => {
    yourMatchDocument.push(
      <Match
        match={match.doc}
        docid={match.docid}
        isYouHaveMatch={isYouHaveMatch}
        key={match.docid}
      />
    );
  });

  const openMatchesDocument = [];
  openMatches.forEach((match) => {
    openMatchesDocument.push(
      <Match
        match={match.doc}
        docid={match.docid}
        isYouHaveMatch={isYouHaveMatch}
        key={match.docid}
      />
    );
  });

  function createMatch() {
    if (isYouHaveMatch) {
      alert("You are already in or own a match.");
    } else {
      const newDoc = {
        owner: username,
        black: "",
        white: "",
        win: "",
        status: "open",
        create: serverTimestamp(),
        id: maxMatchId + 1,
        blackMeasure: 0,
        whiteMeasure: 0,
        measuring: "",
        measuredI: [],
        measuredJ: [],
        measuredValue: [],
      };
      addDoc(collection(db, "matches"), newDoc);
      const docRef = doc(db, "variables", "max-match-id");
      updateDoc(docRef, { value: maxMatchId + 1 });
    }
  }

  return (
    <div>
      <div className="fixed-contents">
        <div>login : {username}</div>
        <div className="home-content">
          <span className="home-content-description">*unavailable now...</span>
          <div className="home-content-center">
            <span className="home-content-title">Play Game with AI</span>
          </div>
        </div>
        <div className="home-content" onClick={createMatch}>
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
      <div className="home-content-standard-message">{standardMessage}</div>
    </div>
  );
}
