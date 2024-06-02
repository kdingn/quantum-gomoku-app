export default function Match(props) {
  const match = props.match;
  const date = match.update.toDate();

  return (
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
}
