import { useRouter } from "next/navigation";

export default function Match(props) {
  const router = useRouter();
  const match = props.match;
  const date = match.update.toDate();

  function routeMatch() {
    router.push(`/match?id=${match.id}`);
  }

  return (
    <div className="home-content-matchinfo-wrapper">
      {match.status === "progress" ? (
        <div className="home-content-matchinfo-progress" onClick={routeMatch}>
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
      ) : (
        <div className="home-content-matchinfo-open">
          <span className="home-content-matchinfo-timestamp">
            {`${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}
            , #{match.id}
          </span>
          <div className="home-content-matchinfo-title">
            Join&nbsp;
            <div className="home-content-matchinfo-player-open">
              {match.owner}
            </div>
            &apos;s match
          </div>
        </div>
      )}
    </div>
  );
}
