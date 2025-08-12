import { useState } from 'react'

// Component Status
function Status({ winner, xIsNext, squares }) {
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!winner && squares.every((square) => square !== null)) {
    status = 'Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className='status'>{status}</div>
  );
}

// Component Square
function Square({ value, onSquareClick }) {
  return ( 
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Component Board
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(index) {
    if (squares[index] || findTheWinner(squares)) return;
    
    const nextSquares = [...squares];
    
    nextSquares[index] = xIsNext ? 'X' : 'O';

    onPlay(nextSquares);
  }

  return (
    <>
      <Status winner={findTheWinner(squares)} xIsNext={xIsNext} squares={squares} />
      
      <div className='board'>
        {
          Array.from({ length: 9 }).map((_, index) => {
            return (
              <Square 
                key={index} 
                value={squares[index]} 
                onSquareClick={() => handleClick(index)}
              />
            );
          })
        }
      </div>
    </>
  );
}

// Component Game
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((_, move) => {
    const description = move ? 'Go to move #' + move : 'Go to game start';
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <div className='game'>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function Find Winner
function findTheWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
}