export default function Scoreboard({ score }) {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      <div>🏆 Win: {score.win}</div>
      <div>😔 Lose: {score.lose}</div>
      <div>🤝 Draw: {score.draw}</div>
    </div>
  );
}
