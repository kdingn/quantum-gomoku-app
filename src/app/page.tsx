"use client";

export default function Home() {
  const username = sessionStorage.getItem("username");

  return (
    <div>
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
  );
}
