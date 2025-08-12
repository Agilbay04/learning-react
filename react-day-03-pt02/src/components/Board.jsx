import Square from './Square';
import Status from './Status';
import { findTheWinner } from '../utils/findTheWinner';

export default function Board({ xIsNext, squares, onPlay }) {
  const { winner, line } = findTheWinner(squares);

  function handleClick(index) {
    if (squares[index] || winner) return;
    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <>
      <Status winner={winner} xIsNext={xIsNext} squares={squares} />
      <div className='board'>
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            highlight={line.includes(index)}
          />
        ))}
      </div>
    </>
  );
}
