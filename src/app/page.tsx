"use client";

export default function Home() {
  const username = sessionStorage.getItem("username");

  const matchesDocument = [];
  for (let i = 1; i < 10; i++) {
    matchesDocument.push(<div className="home-content-matchinfo">aaa</div>);
  }

  return (
    <div>
      <div className="fixed-contents">
        <div>login : {username}</div>
        <div className="home-content">
          <span className="home-content-description">*now in preparing...</span>
          <div className="home-content-center">
            <span>Play Game with AI</span>
          </div>
        </div>
        <div className="home-content">
          <div className="home-content-center">
            <span>Create Match</span>
          </div>
        </div>
      </div>
      <div>
        <span className="home-content-matches-title">Matches</span>
        {matchesDocument}
      </div>
    </div>
  );
}
