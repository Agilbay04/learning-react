export default function Status({ winner, xIsNext, squares }) {
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!winner && squares.every(s => s !== null)) {
    status = 'Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }
  return <div className='status'>{status}</div>;
}
